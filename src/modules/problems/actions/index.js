"use server"
import db from "@/lib/db";
import { getCurrentUser } from "@/modules/auth/actions";
import { currentUser } from "@clerk/nextjs/server";

import { currentUserRole } from "@/modules/auth/actions";
import { revalidatePath } from "next/cache";

import { pollBatchResults, submitBatch } from "@/lib/judge0";

import { getLanguageName } from "@/lib/judge0";
import { success } from "zod";

export async function getAllProblems() {
    try {
      const user = await currentUser();
  
      const problems = await db.problem.findMany({
        include: {
          solvedBy: user
            ? {
                where: {
                  user: {
                    clerkId: user.id,
                  },
                },
              }
            : false,
        },
        orderBy: { createdAt: "desc" },
      });
  
      return {
        success: true,
        data: problems, 
      };
    } catch (error) {
      console.error("❌ Error fetching problems:", error);
      return {
        success: false,
        data: [], 
        message: "Failed to fetch problems",
      };
    }
  }
  

export async function getProblemById(problemId){
    try{
        const problem=await db.problem.findUnique({
            where:{id:problemId}
        });

        if(!problem){
            return {success:false,message:"Problem not found"};
        }

        return {success:true,data:problem};

    }catch(error){
        console.error("❌ Error fetching problem by ID:",error);
        return {success:false,message:"Failed to fetch problem"};
    }
}

export async function getProblemForSolver(problemId) {
    try {
        const problem = await db.problem.findUnique({
            where: { id: problemId }
        });

        if (!problem) {
            return { success: false, message: "Problem not found" };
        }

        // Safe problem without referenceSolution
        const { referenceSolution, ...safeProblem } = problem;

        // Strip output from testCases
        if (Array.isArray(safeProblem.testCases)) {
            safeProblem.testCases = safeProblem.testCases.map(tc => ({
                input: tc.input
            }));
        }

        return { success: true, data: safeProblem };

    } catch (error) {
        console.error("❌ Error fetching problem for solver:", error);
        return { success: false, message: "Failed to fetch problem" };
    }
}

export async function deleteProblem(problemId){
    try{
        const userRole=await currentUserRole()

        if(userRole!=="ADMIN"){
            return {success:false,message:"Unauthorized"};
        }
        const problem=await db.problem.findUnique({
            where:{id:problemId}
        });

        if(!problem){
            return {success:false,message:"Problem not found"};
        }

        await db.problem.delete({
            where:{id:problemId}
        });

        revalidatePath("/problems")

        return {success:true,message:"Problem deleted successfully"};

    }catch(error){
        console.error("❌ Error deleting problem by ID:",error);
        return {success:false,message:"Failed to delete problem"};
    }
}

export const executeCode = async (source_code, language_id, id) => {
  const user = await currentUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const dbUser = await db.user.findUnique({
    where: { clerkId: user.id }
  });
  if (!dbUser) {
    return { success: false, error: "User not found" };
  }

  const problem = await db.problem.findUnique({
    where: { id }
  });
  if (!problem || !Array.isArray(problem.testCases)) {
    return { success: false, error: "Problem or test cases not found" };
  }

  const stdin = problem.testCases.map(tc => tc.input);
  const expected_outputs = problem.testCases.map(tc => tc.output);

  if (
    stdin.length === 0 ||
    expected_outputs.length !== stdin.length
  ) {
    return { success: false, error: "Invalid test cases in database" };
  }

  // 1️⃣ Prepare Judge0 submissions
  const submissions = stdin.map((input) => ({
    source_code,
    language_id,
    stdin: input,
    base64_encoded: false,
    wait: false,
  }));

  // 2️⃣ Submit batch
  const submitResponse = await submitBatch(submissions);
  const tokens = submitResponse.map((res) => res.token);

  // 3️⃣ Poll results
  const results = await pollBatchResults(tokens);

  // 4️⃣ Process results
  let finalStatus = "Accepted";
  let allPassed = true;

  const detailedResults = results.map((result, i) => {
    const expected = expected_outputs[i]?.trim() || null;
    const stdout = result.stdout?.trim() || null;
    const stderr = result.stderr || null;
    const compile_output = result.compile_output || null;
    const judgeStatus = result.status.description;

    let status = judgeStatus;
    let passed = false;

    // 🧨 Compilation Error
    if (compile_output) {
      status = "Compilation Error";
      finalStatus = "Compilation Error";
      allPassed = false;
    }
    // 💥 Runtime Error
    else if (stderr) {
      status = "Runtime Error";
      finalStatus = "Runtime Error";
      allPassed = false;
    }
    // ⏱️ TLE / MLE
    else if (judgeStatus === "Time Limit Exceeded" || judgeStatus === "Memory Limit Exceeded") {
      status = judgeStatus;
      finalStatus = judgeStatus;
      allPassed = false;
    }
    // ✅ Normal execution → compare output
    else {
      passed = stdout === expected;
      if (!passed) {
        status = "Wrong Answer";
        finalStatus = "Wrong Answer";
        allPassed = false;
      }
    }

    return {
      testCase: i + 1,
      passed,
      stdout,
      expected,
      stderr,
      compile_output,
      status,
      memory: result.memory ? `${result.memory} KB` : null,
      time: result.time ? `${result.time} s` : null,
    };
  });

  // 5️⃣ Create Submission row
  const submission = await db.submission.create({
    data: {
      userId: dbUser.id,
      problemId: id,
      sourceCode: source_code,
      language: getLanguageName(language_id),
      stdin: stdin.join('\n'),
      stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
      stderr: detailedResults.some((r) => r.stderr)
        ? JSON.stringify(detailedResults.map((r) => r.stderr))
        : null,
      compileOutput: detailedResults.some((r) => r.compile_output)
        ? JSON.stringify(detailedResults.map((r) => r.compile_output))
        : null,
      status: finalStatus,
      memory: detailedResults.some((r) => r.memory)
        ? JSON.stringify(detailedResults.map((r) => r.memory))
        : null,
      time: detailedResults.some((r) => r.time)
        ? JSON.stringify(detailedResults.map((r) => r.time))
        : null,
    },
  });

  // 6️⃣ Mark problem solved ONLY if Accepted
  if (finalStatus === "Accepted") {
    await db.problemSolved.upsert({
      where: {
        userId_problemId: { userId: dbUser.id, problemId: id },
      },
      update: {},
      create: { userId: dbUser.id, problemId: id },
    });
  }

  // 7️⃣ Create per-test-case rows
  const testCaseResults = detailedResults.map((result) => ({
    submissionId: submission.id,
    testCase: result.testCase,
    passed: result.passed,
    stdout: result.stdout,
    expected: result.expected,
    stderr: result.stderr,
    compileOutput: result.compile_output,
    status: result.status,
    memory: result.memory,
    time: result.time,
  }));

  await db.testCaseResult.createMany({ data: testCaseResults });

  // 8️⃣ Return with testcases
  const submissionWithTestCases = await db.submission.findUnique({
    where: { id: submission.id },
    include: { testCases: true },
  });

  // Strip expected from returned testcases to avoid exposing to client
  let safeSubmission = submissionWithTestCases;
  if (safeSubmission && Array.isArray(safeSubmission.testCases)) {
    safeSubmission = {
      ...safeSubmission,
      testCases: safeSubmission.testCases.map(tc => {
        const { expected, ...rest } = tc;
        return rest;
      })
    };
  }

  return { success: true, submission: safeSubmission };
};

export const getSubmissionByCurrentUserForProblem = async (problemId) => {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  const dbUser = await db.user.findUnique({
    where: { clerkId: user.id },
    select: { id: true }
  });

  if (!dbUser) {
    return { success: false, message: "User not found" };
  }

 const submissions=await db.submission.findMany({
  where:{
    problemId,
    userId:dbUser.id
  }
 })

 return {success:true,data:submissions};
}