import { useState } from "react";
import CodeEditor from "./CodeEditor";
import RunButton from "./RunButton";
import OutputBox from "./OutputBox";

export default function EditorPanel() {
  const [code, setCode] = useState("# Write your code here...");
  const [output, setOutput] = useState("");

  const runCode = () => {
    // For now, just display a mocked output
    setOutput("✅ Code ran successfully (mocked output).");
  };

  return (
    <div className="w-1/2 h-full p-4 box-border flex flex-col bg-app text-app border-l border-app">
      <div className="flex-1 border border-app rounded mb-2 overflow-hidden bg-app-dark">
        <CodeEditor value={code} onChange={(value) => setCode(value ?? "")} />
      </div>
      <RunButton onClick={runCode} />
      <OutputBox output={output} />
    </div>
  );
}
