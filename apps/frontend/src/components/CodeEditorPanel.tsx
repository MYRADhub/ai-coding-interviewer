import { useState } from "react";
import CodeEditor from "./CodeEditor";
import RunButton from "./RunButton";

export default function CodeEditorPanel() {
    const [code, setCode] = useState("# Write your code here...");

    const runCode = () => {
        // For now, just display a mocked output
        console.log("✅ Code ran successfully (mocked output).");
    };
        
  return (
    <div className="border border-app bg-app-dark rounded p-2 flex flex-col">
      <div className="flex justify-between mb-2">
        <RunButton onClick={runCode} />
        <select className="bg-app-light border border-app rounded text-sm px-2 py-1">
          <option>Python</option>
          <option>JavaScript</option>
        </select>
      </div>
        <CodeEditor value={code} onChange={(value) => setCode(value ?? "")} />
    </div>
  );
}
