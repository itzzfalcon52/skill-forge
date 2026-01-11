import axios from "axios";

const RAPIDAPI_BASE_URL = "https://judge0-ce.p.rapidapi.com";

const axiosInstance = axios.create({
  baseURL: RAPIDAPI_BASE_URL,
  headers: {
    "X-RapidAPI-Key": process.env.RAPIDAPI_JUDGE0_KEY,
    "X-RapidAPI-Host": process.env.RAPIDAPI_JUDGE0_HOST,
    "Content-Type": "application/json",
  },
});

// --------------------
// Language mapping
// --------------------
export function getJudge0Id(language) {
  const languageMap = {
    python: 71,
    javascript: 63,
    cpp: 54,
  };
  return languageMap[language.toLowerCase()] || null;
}

export function getLanguageName(languageId) {
  const idMap = {
    71: "python",
    63: "javascript",
    54: "cpp",
  };
  return idMap[languageId] || "unknown";
}

// --------------------
// Submit batch
// --------------------
export async function submitBatch(submissions) {
  console.log("🚀 Submitting to RapidAPI Judge0:", submissions.length);

  const { data } = await axiosInstance.post(
    `/submissions/batch?base64_encoded=false`,
    { submissions }
  );

  return data;
}

// --------------------
// Poll results
// --------------------
export async function pollBatchResults(tokens) {
  while (true) {
    const { data } = await axiosInstance.get(`/submissions/batch`, {
      params: {
        tokens: tokens.join(","),
        base64_encoded: false,
        fields:
          "token,status_id,status,stdout,stderr,compile_output,message,time,memory",
      },
    });

    const results = data.submissions;

    const stillRunning = results.filter((r) =>
      [1, 2].includes(r.status_id)
    );

    if (stillRunning.length === 0) {
      return results;
    }

    await new Promise((r) => setTimeout(r, 1500));
  }
}
