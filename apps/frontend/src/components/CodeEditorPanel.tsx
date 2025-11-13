import { useState } from "react";
import CodeEditor from "./CodeEditor";
import RunButton from "./RunButton";
import { useInterviewSession } from "../context/InterviewSessionContext";

export default function CodeEditorPanel() {
  const {
    code,
    setCode,
    testCases,
    setTestCases,
    problem,
    setValidationResult,
    invalidateValidation,
  } = useInterviewSession();

  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/run-tests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          code,
          problemId: problem.id,
          tests: testCases.map((test) => ({
            id: test.id,
            input: test.input,
            expected: test.expected,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Runner returned an error");
      }

      type RemoteResult = {
        id: number;
        actual?: string;
        passed?: boolean;
      };
      type RemoteSummary = {
        status?: string;
        passedCount?: number;
        totalCount?: number;
        lastRunAt?: number;
      };

      const data = await response.json();
      const remoteResults: RemoteResult[] = Array.isArray(data.results) ? data.results : [];
      const resultsById = new Map(remoteResults.map((result) => [result.id, result]));

      const updatedTests = testCases.map((test) => {
        const remote = resultsById.get(test.id);
        if (!remote) return test;
        return {
          ...test,
          actual: remote.actual ?? "",
          passed: remote.passed ?? false,
        };
      });

      setTestCases(updatedTests);

      const summary: RemoteSummary = data.summary ?? {};
      const passedCount =
        typeof summary.passedCount === "number"
          ? summary.passedCount
          : updatedTests.filter((test) => test.passed).length;
      const totalCount =
        typeof summary.totalCount === "number" ? summary.totalCount : updatedTests.length;
      const status =
        summary.status === "passed" || summary.status === "failed"
          ? summary.status
          : totalCount === 0
          ? "idle"
          : passedCount === totalCount
          ? "passed"
          : "failed";

      setValidationResult({
        status,
        lastRunAt: summary.lastRunAt ?? Date.now(),
        totalCount,
        passedCount,
      });
    } catch (err) {
      console.error("Failed to run tests:", err);
      setTestCases((prev) =>
        prev.map((test) => ({
          ...test,
          actual: "❌ Error contacting runner",
          passed: false,
        }))
      );
      setValidationResult({
        status: testCases.length === 0 ? "idle" : "failed",
        lastRunAt: Date.now(),
        totalCount: testCases.length,
        passedCount: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-app bg-app-dark rounded p-2 flex flex-col">
      <div className="flex justify-between mb-2">
        <RunButton onClick={runCode} disabled={loading} />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-app-light border border-app rounded text-sm px-2 py-1"
          disabled={loading}
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>
      <CodeEditor
        value={code}
        onChange={(value) => {
          invalidateValidation();
          setCode(value ?? "");
        }}
      />
      {loading && (
        <div className="text-app-muted text-xs mt-2 text-center">Running all test cases...</div>
      )}
    </div>
  );
}
