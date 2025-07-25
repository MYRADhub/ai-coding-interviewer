import React, { createContext, useContext, useState } from "react";
import type { Problem } from "../utils/types";

export type TestCase = {
  id: number;
  input: string;
  expected: string;
  actual?: string;
  passed?: boolean | null;
};

type InterviewSessionContextType = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  problem: Problem;
  setProblem: React.Dispatch<React.SetStateAction<Problem>>;
  testCases: TestCase[];
  setTestCases: React.Dispatch<React.SetStateAction<TestCase[]>>;
};

const defaultProblem: Problem = {
  id: "3098",
  title: "Find the Sum of Subsequence Powers",
  description: "You are given an integer array nums of length n...",
  examples: [
    { input: "nums = [1,2,3,4], k = 3", output: "5" },
  ],
};

const InterviewSessionContext = createContext<InterviewSessionContextType | undefined>(undefined);

export function useInterviewSession() {
  const ctx = useContext(InterviewSessionContext);
  if (!ctx) throw new Error("useInterviewSession must be used inside InterviewSessionProvider");
  return ctx;
}

export const InterviewSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [code, setCode] = useState("# Write your code here...");
  const [problem, setProblem] = useState<Problem>(defaultProblem);
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: 1, input: "1 2 3", expected: "6", actual: "", passed: null },
    { id: 2, input: "4 5 6", expected: "15", actual: "", passed: null },
  ]);

  return (
    <InterviewSessionContext.Provider
      value={{
        code, setCode,
        problem, setProblem,
        testCases, setTestCases
      }}
    >
      {children}
    </InterviewSessionContext.Provider>
  );
};
