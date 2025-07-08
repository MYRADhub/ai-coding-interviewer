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
    <div className="w-1/2 h-full p-4 box-border flex flex-col">
      <div className="flex-1 border rounded mb-2 overflow-hidden">
        <CodeEditor value={code} onChange={(value) => setCode(value ?? "")} />
      </div>
      <RunButton onClick={runCode} />
      <OutputBox output={output} />
    </div>
  );
}
