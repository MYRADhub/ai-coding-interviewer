import { useState } from "react";
import ProblemPanel from "../components/ProblemPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";
import ChatPanel from "../components/ChatPanel";
import OutputPanel from "../components/OutputPanel";
import type { Problem } from "../utils/types";

// Example mock problem object
const defaultProblem: Problem = {
  id: "3098",
  title: "Find the Sum of Subsequence Powers",
  description: "You are given an integer array nums of length n...",
  examples: [
    {
      input: "nums = [1,2,3,4], k = 3",
      output: "5",
    },
  ],
};

export default function CodingInterviewLayout() {
  const [output, setOutput] = useState<string>("");
  const [code, setCode] = useState<string>("# Write your code here...");
  const [problem] = useState(defaultProblem);

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 p-2 h-[calc(100vh-56px)] bg-app text-app box-border">
      <ProblemPanel problem={problem} />
      <CodeEditorPanel code={code} setCode={setCode} setOutput={setOutput} />
      <ChatPanel problem={problem} code={code} />
      <OutputPanel output={output} />
    </div>
  );
}
