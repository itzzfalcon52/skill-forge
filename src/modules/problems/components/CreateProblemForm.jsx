"use client";

import { Editor } from "@monaco-editor/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Router from "next/router";
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Download,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const problemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      })
    )
    .min(1, "At least one test case is required"),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    CPP: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
  }),
  codeSnippets: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript code snippet is required"),
    PYTHON: z.string().min(1, "Python code snippet is required"),
    CPP: z.string().min(1, "C++ solution is required"),
  }),
  referenceSolution: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript solution is required"),
    PYTHON: z.string().min(1, "Python solution is required"),
    CPP: z.string().min(1, "C++ solution is required"),
  }),
});

// Sample problem data for pre-filling the form
export const sampledpData = {
    title: "Trapping Rain Water",
    description:
      "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    difficulty: "HARD",
    tags: ["Array", "Two Pointers", "Stack", "Dynamic Programming"],
    constraints: "1 <= n <= 2 * 10^5\n0 <= height[i] <= 10^5",
    hints:
      "Water trapped at index i depends on the minimum of max height to its left and right.",
    editorial:
      "Use two pointers or prefix/suffix maximum arrays to compute trapped water efficiently in O(n).",
    testCases: [
      { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", output: "6" },
      { input: "6\n4 2 0 3 2 5", output: "9" },
      { input: "3\n2 0 2", output: "2" },
    ],
    examples: {
      JAVASCRIPT: {
        input: "12\n0 1 0 2 1 0 1 3 2 1 2 1",
        output: "6",
        explanation: "Total trapped water = 6",
      },
      PYTHON: {
        input: "6\n4 2 0 3 2 5",
        output: "9",
        explanation: "Total trapped water = 9",
      },
      CPP: {
        input: "3\n2 0 2",
        output: "2",
        explanation: "Total trapped water = 2",
      },
    },
  
    codeSnippets: {
      JAVASCRIPT: `const fs = require("fs");
  const data = fs.readFileSync(0, "utf8").trim().split(/\\s+/).map(Number);
  
  const n = data[0];
  const height = data.slice(1);
  
  // TODO: write your code here
  
  console.log("0");`,
  
      PYTHON: `import sys
  data = list(map(int, sys.stdin.read().split()))
  
  n = data[0]
  height = data[1:]
  
  # TODO: write your code here
  
  print(0)`,
  
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  
  int main() {
      ios::sync_with_stdio(false);
      cin.tie(NULL);
  
      int n;
      cin >> n;
      vector<int> h(n);
      for(int i = 0; i < n; i++) cin >> h[i];
  
      // TODO: write your code here
  
      cout << 0;
      return 0;
  }`,
    },
  
    referenceSolution: {
      JAVASCRIPT: `const fs = require("fs");
  const data = fs.readFileSync(0, "utf8").trim().split(/\\s+/).map(Number);
  
  const n = data[0];
  const height = data.slice(1);
  
  let left = 0, right = n - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;
  
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else water += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else water += rightMax - height[right];
      right--;
    }
  }
  
  console.log(water.toString());`,
  
      PYTHON: `import sys
  data = list(map(int, sys.stdin.read().split()))
  
  n = data[0]
  height = data[1:]
  
  left, right = 0, n - 1
  leftMax = rightMax = 0
  water = 0
  
  while left < right:
      if height[left] < height[right]:
          if height[left] >= leftMax:
              leftMax = height[left]
          else:
              water += leftMax - height[left]
          left += 1
      else:
          if height[right] >= rightMax:
              rightMax = height[right]
          else:
              water += rightMax - height[right]
          right -= 1
  
  print(water)`,
  
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  
  int main() {
      ios::sync_with_stdio(false);
      cin.tie(NULL);
  
      int n;
      cin >> n;
      vector<int> h(n);
      for(int i = 0; i < n; i++) cin >> h[i];
  
      int left = 0, right = n - 1;
      int leftMax = 0, rightMax = 0;
      long long water = 0;
  
      while (left < right) {
          if (h[left] < h[right]) {
              if (h[left] >= leftMax) leftMax = h[left];
              else water += leftMax - h[left];
              left++;
          } else {
              if (h[right] >= rightMax) rightMax = h[right];
              else water += rightMax - h[right];
              right--;
          }
      }
  
      cout << water;
      return 0;
  }`,
    },
  };

  export const sampleStringProblem = {
    title: "Longest Valid Parentheses",
    description:
      "Given a string containing just '(' and ')', find the length of the longest valid (well-formed) parentheses substring.",
    difficulty: "HARD",
    tags: ["Stack", "Dynamic Programming", "String"],
    constraints: "0 <= s.length <= 3 * 10^5",
    hints: "Use stack or DP to track valid segments.",
    editorial:
      "Use a stack to store indices and compute max valid length.",
    testCases: [
      { input: "(()", output: "2" },
      { input: ")()())", output: "4" },
      { input: "", output: "0" },
    ],
    examples: {
      JAVASCRIPT: { input: ")()())", output: "4", explanation: "()()" },
      PYTHON: { input: "(()", output: "2", explanation: "()" },
      CPP: { input: "", output: "0", explanation: "No valid substring" },
    },
  
    codeSnippets: {
      JAVASCRIPT: `const fs = require("fs");
  const s = fs.readFileSync(0, "utf8").trim();
  
  // TODO
  
  console.log(0);`,
  
      PYTHON: `import sys
  s = sys.stdin.read().strip()
  
  # TODO
  
  print(0)`,
  
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  
  int main() {
      ios::sync_with_stdio(false);
      cin.tie(NULL);
  
      string s;
      getline(cin, s);
  
      // TODO
  
      cout << 0;
      return 0;
  }`,
    },
  
    referenceSolution: {
      JAVASCRIPT: `const fs = require("fs");
  const s = fs.readFileSync(0, "utf8").trim();
  
  let stack = [-1];
  let maxLen = 0;
  
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") stack.push(i);
    else {
      stack.pop();
      if (stack.length === 0) stack.push(i);
      else maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
    }
  }
  
  console.log(maxLen.toString());`,
  
      PYTHON: `import sys
  s = sys.stdin.read().strip()
  
  stack = [-1]
  maxLen = 0
  
  for i, ch in enumerate(s):
      if ch == '(':
          stack.append(i)
      else:
          stack.pop()
          if not stack:
              stack.append(i)
          else:
              maxLen = max(maxLen, i - stack[-1])
  
  print(maxLen)`,
  
      CPP: `#include <bits/stdc++.h>
  using namespace std;
  
  int main() {
      ios::sync_with_stdio(false);
      cin.tie(NULL);
  
      string s;
      getline(cin, s);
  
      stack<int> st;
      st.push(-1);
  
      int maxLen = 0;
  
      for (int i = 0; i < s.size(); i++) {
          if (s[i] == '(') {
              st.push(i);
          } else {
              st.pop();
              if (st.empty()) st.push(i);
              else maxLen = max(maxLen, i - st.top());
          }
      }
  
      cout << maxLen;
      return 0;
  }`,
    },
  };
  
  

const CodeEditor = ({ value, onChange, language = "javascript" }) => {
  // Map language names to Monaco Editor language IDs
  const languageMap = {
    javascript: "javascript",
    python: "python",
    cpp: "cpp",
  };

  return (
    <div className="border rounded-md bg-slate-950 text-slate-50">
      <div className="px-4 py-2 bg-slate-800 border-b text-sm font-mono">
        {language}
      </div>
      <div className="h-75 w-full">
        <Editor
          height="300px"
          defaultLanguage={languageMap[language]}
          theme="vs-dark"
          value={value}
          onChange={onChange}
          options={{
            minimap: { enabled: false },
            fontSize: 18,
            lineNumbers: "on",
            readOnly: false,
            wordWrap: "on",
            formatOnPaste: true,
            formatOnType: true,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

const CreateProblemForm = () => {
  const router = useRouter();
  const [sampleType, setSampleType] = useState("DP");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      testCases: [{ input: "", output: "" }],
      tags: [""],
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        CPP: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {
        JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
        PYTHON: "def solution():\n    # Write your code here\n    pass",
        CPP: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolution: {
        JAVASCRIPT: "// Add your reference solution here",
        PYTHON: "# Add your reference solution here",
        CPP: "// Add your reference solution here",
      },
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = form;

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replaceTestCases,
  } = useFieldArray({
    control,
    name: "testCases",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
  
      const res = await fetch("/api/create-problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      const data = await res.json(); 
  
      if (!data.success) {
        toast.error(data.message || "Failed to create problem.Kindly,check your code");
        return;
      }
  
      toast.success(data.message || "Problem created successfully");
      router.push("/problems");
  
    } catch (error) {
      console.error("Error creating problem:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  

  const loadSampleData = () => {
    const sampleData = sampleType === "DP" ? sampledpData : sampleStringProblem;
    replaceTags(sampleData.tags.map((tag) => tag));
    replaceTestCases(sampleData.testCases.map((tc) => tc));
    reset(sampleData);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <Card className="shadow-xl">
        <CardHeader className="pb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-3xl flex items-center gap-3">
              <FileText className="w-8 h-8 text-amber-600" />
              Create Problem
            </CardTitle>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex border rounded-md">
                <Button
                  type="button"
                  variant={sampleType === "DP" ? "default" : "outline"}
                  size="sm"
                  className="rounded-r-none"
                  onClick={() => setSampleType("DP")}
                >
                  DP Problem
                </Button>
                <Button
                  type="button"
                  variant={sampleType === "string" ? "default" : "outline"}
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setSampleType("string")}
                >
                  String Problem
                </Button>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={loadSampleData}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Load Sample
              </Button>
              
            </div>
          </div>
          <Separator />
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="title" className="text-lg font-semibold">
                  Title
                </Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Enter problem title"
                  className="mt-2 text-lg"
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description" className="text-lg font-semibold">
                  Description
                </Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Enter problem description"
                  className="mt-2 min-h-32 text-base resize-y"
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="difficulty" className="text-lg font-semibold">
                  Difficulty
                </Label>
                <Controller
                  name="difficulty"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EASY">
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            Easy
                          </Badge>
                        </SelectItem>
                        <SelectItem value="MEDIUM">
                          <Badge
                            variant="secondary"
                            className="bg-amber-100 text-amber-800"
                          >
                            Medium
                          </Badge>
                        </SelectItem>
                        <SelectItem value="HARD">
                          <Badge
                            variant="secondary"
                            className="bg-red-100 text-red-800"
                          >
                            Hard
                          </Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.difficulty && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.difficulty.message}
                  </p>
                )}
              </div>
            </div>

            {/* Tags */}
            <Card className="bg-amber-50 dark:bg-amber-950/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-600" />
                    Tags
                  </CardTitle>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => appendTag("")}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Tag
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tagFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                      <Input
                        {...register(`tags.${index}`)}
                        placeholder="Enter tag"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTag(index)}
                        disabled={tagFields.length === 1}
                        className="p-2"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
                {errors.tags && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.tags.message}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Test Cases */}
            <Card className="bg-green-50 dark:bg-green-950/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Test Cases
                  </CardTitle>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => appendTestCase({ input: "", output: "" })}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Test Case
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {testCaseFields.map((field, index) => (
                  <Card key={field.id} className="bg-background">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          Test Case #{index + 1}
                        </CardTitle>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTestCase(index)}
                          disabled={testCaseFields.length === 1}
                          className="text-red-500 gap-2"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="font-medium">Input</Label>
                          <Textarea
                            {...register(`testCases.${index}.input`)}
                            placeholder="Enter test case input"
                            className="mt-2 min-h-24 resize-y font-mono"
                          />
                          {errors.testCases?.[index]?.input && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.testCases[index].input.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label className="font-medium">Expected Output</Label>
                          <Textarea
                            {...register(`testCases.${index}.output`)}
                            placeholder="Enter expected output"
                            className="mt-2 min-h-24 resize-y font-mono"
                          />
                          {errors.testCases?.[index]?.output && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.testCases[index].output.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {errors.testCases && !Array.isArray(errors.testCases) && (
                  <p className="text-sm text-red-500">
                    {errors.testCases.message}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Code Editor Sections */}
            {["JAVASCRIPT", "PYTHON", "CPP"].map((language) => (
              <Card key={language} className="bg-slate-50 dark:bg-slate-950/20">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-slate-600" />
                    {language}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Starter Code */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Starter Code Template
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Controller
                        name={`codeSnippets.${language}`}
                        control={control}
                        render={({ field }) => (
                          <CodeEditor
                            value={field.value}
                            onChange={field.onChange}
                            language={language.toLowerCase()}
                          />
                        )}
                      />
                      {errors.codeSnippets?.[language] && (
                        <p className="text-sm text-red-500 mt-2">
                          {errors.codeSnippets[language].message}
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Reference Solution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Reference Solution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Controller
                        name={`referenceSolution.${language}`}
                        control={control}
                        render={({ field }) => (
                          <CodeEditor
                            value={field.value}
                            onChange={field.onChange}
                            language={language.toLowerCase()}
                          />
                        )}
                      />
                      {errors.referenceSolution?.[language] && (
                        <p className="text-sm text-red-500 mt-2">
                          {errors.referenceSolution[language].message}
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Examples */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Example</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="font-medium">Input</Label>
                          <Textarea
                            {...register(`examples.${language}.input`)}
                            placeholder="Example input"
                            className="mt-2 min-h-20 resize-y font-mono"
                          />
                          {errors.examples?.[language]?.input && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.examples[language].input.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label className="font-medium">Output</Label>
                          <Textarea
                            {...register(`examples.${language}.output`)}
                            placeholder="Example output"
                            className="mt-2 min-h-20 resize-y font-mono"
                          />
                          {errors.examples?.[language]?.output && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.examples[language].output.message}
                            </p>
                          )}
                        </div>
                        <div className="md:col-span-2">
                          <Label className="font-medium">Explanation</Label>
                          <Textarea
                            {...register(`examples.${language}.explanation`)}
                            placeholder="Explain the example"
                            className="mt-2 min-h-24 resize-y"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            ))}

            {/* Additional Information */}
            <Card className="bg-amber-50 dark:bg-amber-950/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="font-medium">Constraints</Label>
                  <Textarea
                    {...register("constraints")}
                    placeholder="Enter problem constraints"
                    className="mt-2 min-h-24 resize-y font-mono"
                  />
                  {errors.constraints && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.constraints.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="font-medium">Hints (Optional)</Label>
                  <Textarea
                    {...register("hints")}
                    placeholder="Enter hints for solving the problem"
                    className="mt-2 min-h-24 resize-y"
                  />
                </div>
                <div>
                  <Label className="font-medium">Editorial (Optional)</Label>
                  <Textarea
                    {...register("editorial")}
                    placeholder="Enter problem editorial/solution explanation"
                    className="mt-2 min-h-32 resize-y"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Create Problem
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProblemForm;
