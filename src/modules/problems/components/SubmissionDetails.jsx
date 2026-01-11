import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CpuIcon, Code, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

function SubmissionDetails({ submission }) {
  const testCases = submission.testCases || [];

  const hasCompileError = testCases.some(tc => tc.compileOutput);
  const runtimeErrorCase = testCases.find(tc => tc.stderr);
  const isAccepted = submission.status === "Accepted";

  let verdict = "Wrong Answer";
  let verdictColor = "bg-red-500/10 text-red-500";
  let verdictIcon = <XCircle className="mr-1 h-3 w-3" />;

  if (hasCompileError) {
    verdict = "Compilation Error";
  } else if (runtimeErrorCase) {
    verdict = "Runtime Error";
  } else if (isAccepted) {
    verdict = "Accepted";
    verdictColor = "bg-green-500/10 text-green-500";
    verdictIcon = <CheckCircle2 className="mr-1 h-3 w-3" />;
  }

  const avgMemory =
    submission.memory
      ? JSON.parse(submission.memory).map(m => parseFloat(m)).reduce((a, b) => a + b, 0) /
        JSON.parse(submission.memory).length
      : 0;

  const avgTime =
    submission.time
      ? JSON.parse(submission.time)
          .map(t => parseFloat(t))
          .reduce((a, b) => a + b, 0) /
        JSON.parse(submission.time).length
      : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Submission Result</CardTitle>
          <Badge className={verdictColor}>
            {verdictIcon}
            {verdict}
          </Badge>
        </div>
        <CardDescription>
          Submitted at {new Date(submission.submittedAt || submission.createdAt).toLocaleString()}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Compile Error */}
        {hasCompileError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-500 font-semibold mb-2">
              <AlertTriangle className="h-4 w-4" />
              Compilation Error
            </div>
            <pre className="text-sm whitespace-pre-wrap text-red-400">
              {testCases.find(tc => tc.compileOutput)?.compileOutput}
            </pre>
          </div>
        )}

        {/* Runtime Error */}
        {!hasCompileError && runtimeErrorCase && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-500 font-semibold mb-2">
              <AlertTriangle className="h-4 w-4" />
              Runtime Error
            </div>
            <pre className="text-sm whitespace-pre-wrap text-red-400">
              {runtimeErrorCase.stderr}
            </pre>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Language</p>
              <p className="text-sm text-muted-foreground">{submission.language}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CpuIcon className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Avg Memory</p>
              <p className="text-sm text-muted-foreground">{avgMemory.toFixed(2)} KB</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Avg Time</p>
              <p className="text-sm text-muted-foreground">{avgTime.toFixed(3)} s</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SubmissionDetails;
