import ProblemPanel from "../components/ProblemPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";
import ChatPanel from "../components/ChatPanel";
import OutputPanel from "../components/OutputPanel";
import { useState } from "react";

export default function CodingInterviewLayout() {
  const [output, setOutput] = useState<string>("");

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 p-2 h-[calc(100vh-56px)] bg-app text-app box-border">
      <ProblemPanel />
      <CodeEditorPanel setOutput={setOutput} />
      <ChatPanel />
      <OutputPanel output={output} />
    </div>
  );
}
