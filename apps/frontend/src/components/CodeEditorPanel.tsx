import { useState } from "react";
import CodeEditor from "./CodeEditor";
import RunButton from "./RunButton";

type Props = {
  code: string;
  setCode: (code: string) => void;
  setOutput: (output: string) => void;
};``

export default function CodeEditorPanel({ code, setCode, setOutput }: Props) {
    const [language, setLanguage] = useState("python");

    const runCode = async () => {
      const response = await fetch("http://localhost:3001/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language, code, input: "5" }),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        setOutput(data.output);
      } else {
        alert(`Error:\n${data.output}`);
      }
    };

        
  return (
    <div className="border border-app bg-app-dark rounded p-2 flex flex-col">
      <div className="flex justify-between mb-2">
        <RunButton onClick={runCode} />
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-app-light border border-app rounded text-sm px-2 py-1">
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>
        <CodeEditor value={code} onChange={(value) => setCode(value ?? "")} />
    </div>
  );
}
