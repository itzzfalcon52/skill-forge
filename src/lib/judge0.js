import { NextResponse } from "next/server";

export function getJudge0Id(language){
    const languageMap={
        "python":71,
        "javascript":63,
        "cpp":54,
        "java":62,
        "c":50,
        "ruby":72,
        "go":60
    };

    return languageMap[language.toLowerCase()]||null;
}

export async function submitBatch(submissions){
    const {data}=await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{submissions})
    console.log("batch submission response:",data);
    return data;

}

export async function pollBatchResults(tokens){
    while(true){
        const {data}=await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
            params:{
                tokens:tokens.join(","),
                base64_encoded:false,
                fields:"token,status_id,stdout,stderr,compile_output,message"
            }
        });

        const results=data.submissions;
        const pendingResults=results.filter(result=>[1,2].includes(result.status_id));

        if(pendingResults.length===0){
            return results;
        }
        

        await new Promise((resolve)=>setTimeout(resolve,2000));
    }

}