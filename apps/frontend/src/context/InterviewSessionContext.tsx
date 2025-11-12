import React, { createContext, useContext, useEffect, useState } from "react";
import type { Problem, TestCase, Message } from "../utils/types";
import { problems, defaultProblem } from "../data/problems";

type InterviewSessionContextType = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  problem: Problem;
  availableProblems: Problem[];
  selectProblem: (problemId: string) => void;
  testCases: TestCase[];
  setTestCases: React.Dispatch<React.SetStateAction<TestCase[]>>;
  selectedTestIndex: number;
  setSelectedTestIndex: React.Dispatch<React.SetStateAction<number>>;
  chatMessages: Message[];
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const STORAGE_KEY = "ai-coding-interviewer::session";

type SessionSlice = {
  code: string;
  testCases: TestCase[];
  selectedTestIndex: number;
  chatMessages: Message[];
};

type PersistedData = {
  currentProblemId: string;
  sessions: Record<string, SessionSlice>;
};

const defaultCode = "# Write your code here...";

const createDefaultTestCases = (): TestCase[] => [
  { id: 1, input: "1 2 3", expected: "6", actual: "", passed: null },
  { id: 2, input: "4 5 6", expected: "15", actual: "", passed: null },
];

const createDefaultChat = (): Message[] => [
  {
    sender: "agent",
    text: "Hi, I'm your AI interviewer. Let's start! Can you solve this problem for me?",
  },
];

const createDefaultSession = (): SessionSlice => ({
  code: defaultCode,
  testCases: createDefaultTestCases(),
  selectedTestIndex: 0,
  chatMessages: createDefaultChat(),
});

const normalizeTestCases = (cases?: TestCase[]): TestCase[] =>
  cases && cases.length > 0 ? cases : createDefaultTestCases();

const clampIndex = (index: number, length: number) => {
  if (!Number.isFinite(index) || length <= 0) return 0;
  return Math.min(Math.max(index, 0), length - 1);
};

const readPersistedData = (): PersistedData | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as PersistedData;
  } catch {
    return null;
  }
};

const InterviewSessionContext = createContext<InterviewSessionContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useInterviewSession() {
  const ctx = useContext(InterviewSessionContext);
  if (!ctx) throw new Error("useInterviewSession must be used inside InterviewSessionProvider");
  return ctx;
}

export const InterviewSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const persisted = readPersistedData();
  const initialProblemId = persisted?.currentProblemId ?? defaultProblem.id;
  const [currentProblemId, setCurrentProblemId] = useState(initialProblemId);
  const problem = problems.find((p) => p.id === currentProblemId) ?? defaultProblem;

  const defaultSession = createDefaultSession();
  const initialSession = persisted?.sessions?.[initialProblemId] ?? defaultSession;
  const hydratedTestCases = normalizeTestCases(initialSession.testCases);

  const [code, setCode] = useState(initialSession.code ?? defaultCode);
  const [testCases, setTestCases] = useState<TestCase[]>(hydratedTestCases);
  const [selectedTestIndex, setSelectedTestIndex] = useState(
    clampIndex(initialSession.selectedTestIndex ?? 0, hydratedTestCases.length)
  );
  const [chatMessages, setChatMessages] = useState<Message[]>(initialSession.chatMessages ?? createDefaultChat());

  const selectProblem = (problemId: string) => {
    if (problemId === currentProblemId) return;
    setCurrentProblemId(problemId);
    const stored = readPersistedData();
    const session = stored?.sessions?.[problemId] ?? createDefaultSession();
    const normalizedCases = normalizeTestCases(session.testCases);
    setCode(session.code ?? defaultCode);
    setTestCases(normalizedCases);
    setSelectedTestIndex(clampIndex(session.selectedTestIndex ?? 0, normalizedCases.length));
    setChatMessages(session.chatMessages ?? createDefaultChat());
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = readPersistedData() ?? { currentProblemId: currentProblemId, sessions: {} };
    const nextData: PersistedData = {
      currentProblemId: currentProblemId,
      sessions: {
        ...existing.sessions,
        [currentProblemId]: {
          code,
          testCases,
          selectedTestIndex,
          chatMessages,
        },
      },
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
  }, [currentProblemId, code, testCases, selectedTestIndex, chatMessages]);

  return (
    <InterviewSessionContext.Provider
      value={{
        code,
        setCode,
        problem,
        availableProblems: problems,
        selectProblem,
        testCases,
        setTestCases,
        selectedTestIndex,
        setSelectedTestIndex,
        chatMessages,
        setChatMessages,
      }}
    >
      {children}
    </InterviewSessionContext.Provider>
  );
};
