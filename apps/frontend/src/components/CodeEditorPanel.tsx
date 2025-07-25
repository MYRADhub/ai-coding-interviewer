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
  } = useInterviewSession();

  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);

    // Run each test case and update results
    const results = await Promise.all(
      testCases.map(async (test) => {
        try {
          const response = await fetch("http://localhost:3001/api/run", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              language,
              code,
              input: test.input,
            }),
          });
          const data = await response.json();
          const actual = (data.output ?? "").replace(/\r/g, "").trim();
          const expected = (test.expected ?? "").replace(/\r/g, "").trim();
          const passed = actual === expected;
          return { ...test, actual, passed };
        } catch {
          return { ...test, actual: "❌ Error running code", passed: false };
        }
      })
    );

    setTestCases(results);
    setLoading(false);
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
        onChange={(value) => setCode(value ?? "")}
      />
      {loading && (
        <div className="text-app-muted text-xs mt-2 text-center">Running all test cases...</div>
      )}
    </div>
  );
}
