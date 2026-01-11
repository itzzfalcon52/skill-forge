import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

function TestCaseTable({ testCases }) {
  return (
    <div className="w-full rounded-lg border">
      <Table>
        <TableCaption>Test Case Results</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Case #</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Memory</TableHead>
            <TableHead>Output / Error</TableHead>
            <TableHead>Expected</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testCases.map((tc, index) => {
            const isCompileError = !!tc.compileOutput;
            const isRuntimeError = !!tc.stderr;

            return (
              <TableRow key={tc.id}>
                <TableCell className="font-medium">Test {index + 1}</TableCell>

                <TableCell>
                  {tc.passed ? (
                    <Badge className="bg-green-500/10 text-green-500">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Passed
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/10 text-red-500">
                      <XCircle className="mr-1 h-3 w-3" />
                      Failed
                    </Badge>
                  )}
                </TableCell>

                <TableCell>{tc.time || "-"}</TableCell>
                <TableCell>{tc.memory || "-"}</TableCell>

                <TableCell className="max-w-[300px] whitespace-pre-wrap font-mono text-xs">
                  {isCompileError && (
                    <span className="text-red-400">{tc.compileOutput}</span>
                  )}
                  {!isCompileError && isRuntimeError && (
                    <span className="text-red-400">{tc.stderr}</span>
                  )}
                  {!isCompileError && !isRuntimeError && tc.stdout}
                </TableCell>

                <TableCell className="font-mono text-xs">
                  {tc.expected || "-"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default TestCaseTable;
