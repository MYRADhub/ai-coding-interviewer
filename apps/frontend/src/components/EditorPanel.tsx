import { useState } from "react";
import CodeEditor from "./CodeEditor";
import RunButton from "./RunButton";
import OutputBox from "./OutputBox";

export default function EditorPanel() {
  const [output, setOutput] = useState("");

  const runCode = () => {
    setOutput("✅ Test passed! (simulated)");
  };

  return (
    <div className="w-1/2 h-full p-4 flex flex-col">
      <div className="flex-1 border rounded mb-2 overflow-hidden">
        <CodeEditor />
      </div>
      <RunButton onClick={runCode} />
      <OutputBox output={output} />
    </div>
  );
}
