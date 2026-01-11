import { NextResponse } from "next/server";
import { currentUserRole, getCurrentUser } from "@/modules/auth/actions";
import { getJudge0Id, submitBatch, pollBatchResults } from "@/lib/judge0";
import db from "@/lib/db";

export async function POST(request) {
  try {
    // -------------------------
    // AUTH
    // -------------------------
    const userRole = await currentUserRole();
    const user = await getCurrentUser();

    if (userRole !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    const body = await request.json();

    const {
      title,
      description,
      difficulty,
      tags,
      testCases,
      examples,
      constraints,
      codeSnippets,
      referenceSolution,
    } = body;

    // -------------------------
    // BASIC VALIDATION
    // -------------------------
    if (
      !title ||
      !description ||
      !difficulty ||
      !Array.isArray(testCases) ||
      testCases.length === 0 ||
      !referenceSolution ||
      !referenceSolution.PYTHON
    ) {
      return NextResponse.json(
        { error: "Missing required fields or Python reference solution" },
        { status: 400 }
      );
    }

    // -------------------------
    // VERIFY USING PYTHON ONLY ✅
    // -------------------------
    const pythonSolution = referenceSolution.PYTHON;

    const judge0LanguageId = getJudge0Id("python");

    if (!judge0LanguageId) {
      return NextResponse.json(
        { error: "Python is not supported by Judge0" },
        { status: 500 }
      );
    }

    const submissions = testCases.map((testCase) => ({
      language_id: judge0LanguageId,
      source_code: pythonSolution,
      stdin: testCase.input,
      expected_output: testCase.output + "\n",
      cpu_time_limit: 2,
      wall_time_limit: 5,
      memory_limit: 256000,
    }));

    // -------------------------
    // SEND TO JUDGE0
    // -------------------------
    const submissionResults = await submitBatch(submissions);
    const tokens = submissionResults.map((r) => r.token);
    const results = await pollBatchResults(tokens);

    // -------------------------
    // CHECK RESULTS
    // -------------------------
    for (let i = 0; i < results.length; i++) {
      const result = results[i];

      if (result.status_id !== 3) {
        return NextResponse.json(
          {
            error: "Python reference solution failed",
            failedTestCase: {
              input: submissions[i].stdin,
              expectedOutput: submissions[i].expected_output,
              actualOutput: result.stdout,
              error:
                result.stderr ||
                result.compile_output ||
                result.message ||
                "Unknown error",
            },
            judge0: result,
          },
          { status: 400 }
        );
      }
    }

    // -------------------------
    // SAVE TO DATABASE ✅
    // -------------------------
    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        codeSnippets,
        referenceSolution,
        userId: user.id,
        testCases,
      },
    });

    return NextResponse.json(
      {
        success: true,
        problem: newProblem,
        message: "Problem created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating problem:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
