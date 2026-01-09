import { currentUserRole } from "@/modules/auth/actions";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "lucide-react";
import { getJudge0Id,submitBatch,pollBatchResults } from "@/lib/judge0";
import { act } from "react";
import db from "@/lib/db";
import { getCurrentUser } from "@/modules/auth/actions";

export async function POST(request){
    try{
        const userRole=await currentUserRole();
        const user=await getCurrentUser();

        if(userRole!=="ADMIN"){
            return new Response(JSON.stringify({success:false,message:"Unauthorized"}),{status:403});
        }
        //get all the fields from the client side

        const body=await request.json();
        const {title,description,difficulty,tags,testCases,examples,constraints,codeSnippets,referenceSolution}=body;
        //basic validations
        if (!title || !description || !difficulty || !testCases || !codeSnippets || !referenceSolutions) {
            return NextResponse.json(
              { error: "Missing required fields" },
              { status: 400 }
            );
          }
      
          // Validate test cases
          if (!Array.isArray(testCases) || testCases.length === 0) { //testcases=[{"input":"","output":""}]
            return NextResponse.json(
              { error: "At least one test case is required" },
              { status: 400 }
            );
          }
      
          // Validate reference solutions
          if (!referenceSolution || typeof referenceSolution !== 'object') {  //{"python":{"code"},"javascript":{"code"}}
            return NextResponse.json(
              { error: "Reference solutions must be provided for all supported languages" },
              { status: 400 }
            );
          }
      
        //run a loop for each language and each language has a number of test cases 
        for(const [language,solution] of Object.entries(referenceSolution)){

        
            
          //get judge0 language id for each language
          const judge0LanguageId=getJudge0Id(language);

            if(!judge0LanguageId){
                return new Response(JSON.stringify({success:false,message:`Unsupported language: ${language}`}),{status:400});
            }
          //prepare judge0 submissions for each test case
          const submissions=testCases.map((testCase)=>{
            return{
                language_id:judge0LanguageId,
                source_code:solution.code,
                stdin:testCase.input,
                expected_output:testCase.output,
                cpu_time_limit:2,
                memory_limit:128000
            }
          });



          //submit all the test cases in one go to judge0
          const submissionResults=await submitBatch(submissions)

          
          //extract tokens from each responses
          const tokens=submissionResults.map((result)=>result.token);
            //polling to get the results for each token
            const results=await pollBatchResults(tokens);
            //check if all test cases passed
            for(let i=0;i<results.length;i++){
                const result=results[i];
                if(status_id!==3){
                    return NextResponse.json({
                        error:`test cases failed for language with token ${result.token}`,
                        testCase:{
                            input:submissions[i].stdin,
                            expectedOutput:submissions[i].expected_output,
                            actualOutput:result.stdout,
                            error:result.stderr||result.compile_output||result.message

                        },
                        details:result,

                    },{status:400});
                }
            }


          //if all test cases passed,save in db
          const newProblem=await db.problem.create({
            data:{
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                codeSnippets,
                referenceSolution,
                userId:user.id
            }
          })
          return new Response(JSON.stringify({success:true,problem:newProblem,message:"Problem created successfully"}),{status:201} );

        }
    }catch(error){
        console.error("❌ Error creating problem:",error);
        return new Response(JSON.stringify({success:false,message:"Internal server error"}),{status:500});

    }
}