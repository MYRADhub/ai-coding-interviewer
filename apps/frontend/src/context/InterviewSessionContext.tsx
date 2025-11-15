import React, { createContext, useContext, useEffect, useState } from "react";
import type {
  Problem,
  TestCase,
  Message,
  ValidationResult,
  Language,
  InterviewStage,
} from "../utils/types";
import { problems, defaultProblem } from "../data/problems";
import {
  readPersistedData,
  writePersistedData,
  type SessionSlice,
  type PersistedData,
} from "../utils/sessionStorage";

type InterviewSessionContextType = {
  code: string;
  setCode: (value: string) => void;
  problem: Problem;
  availableProblems: Problem[];
  selectProblem: (problemId: string) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  interviewStage: InterviewStage;
  setInterviewStage: (stage: InterviewStage) => void;
  testCases: TestCase[];
  setTestCases: React.Dispatch<React.SetStateAction<TestCase[]>>;
  selectedTestIndex: number;
  setSelectedTestIndex: React.Dispatch<React.SetStateAction<number>>;
  chatMessages: Message[];
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  validationResult: ValidationResult;
  setValidationResult: React.Dispatch<React.SetStateAction<ValidationResult>>;
  invalidateValidation: () => void;
};

const ALL_LANGUAGES: Language[] = ["python", "javascript"];
const fallbackCode = "# Write your solution here ...";

const getProblemById = (id: string) => problems.find((p) => p.id === id) ?? defaultProblem;

const getStarterCode = (problem: Problem, language: Language) =>
  problem.starterCode[language] ?? fallbackCode;

const buildDefaultTestCases = (problem: Problem): TestCase[] => {
  if (!problem.sampleTests || problem.sampleTests.length === 0) {
    return [
      { id: 1, label: "Sample 1", input: "", expected: "", actual: "", passed: null },
    ];
  }

  return problem.sampleTests.map((test, index) => ({
    id: Number(`${problem.id}${index + 1}`) || Date.now() + index,
    label: test.label ?? `Test ${index + 1}`,
    input: test.input,
    expected: test.expected,
    actual: "",
    passed: null,
    hidden: test.hidden ?? false,
  }));
};

const createDefaultChat = (): Message[] => [
  {
    sender: "agent",
    text: "Hi, I'm your AI interviewer. Let's start! Can you solve this problem for me?",
  },
];

const createDefaultValidation = (): ValidationResult => ({
  status: "idle",
  totalCount: 0,
  passedCount: 0,
});

const createDefaultSession = (problem: Problem): SessionSlice => {
  const defaultLanguage = problem.defaultLanguage ?? "python";
  const starterMap: SessionSlice["codeByLanguage"] = {};
  ALL_LANGUAGES.forEach((lang) => {
    if (problem.starterCode[lang]) {
      starterMap[lang] = problem.starterCode[lang]!;
    }
  });

  return {
    language: defaultLanguage,
    codeByLanguage: starterMap,
    testCases: buildDefaultTestCases(problem),
    selectedTestIndex: 0,
    chatMessages: createDefaultChat(),
    validation: createDefaultValidation(),
    stage: "introduction",
  };
};

const normalizeTestCases = (cases: TestCase[] | undefined, problem: Problem): TestCase[] => {
  if (cases && cases.length > 0) return cases;
  return buildDefaultTestCases(problem);
};

const mergeCodeMaps = (
  stored: Partial<Record<Language, string>> | undefined,
  problem: Problem
): Partial<Record<Language, string>> => {
  const merged: Partial<Record<Language, string>> = {};
  ALL_LANGUAGES.forEach((lang) => {
    const starter = problem.starterCode[lang];
    if (starter) merged[lang] = starter;
  });
  if (stored) {
    Object.entries(stored).forEach(([lang, value]) => {
      if (value) merged[lang as Language] = value;
    });
  }
  return merged;
};

const hydrateSession = (session: SessionSlice | undefined, problem: Problem): SessionSlice => {
  const base = createDefaultSession(problem);
  if (!session) return base;

  const codeByLanguage = mergeCodeMaps(session.codeByLanguage, problem);
  const legacyCode = (session as unknown as { code?: string }).code;
  const legacyLanguage = (session as unknown as { language?: Language }).language ?? base.language;
  if (legacyCode) {
    codeByLanguage[legacyLanguage] = legacyCode;
  }

  const testCases = normalizeTestCases(session.testCases, problem);

  return {
    language: session.language ?? base.language,
    codeByLanguage,
    testCases,
    selectedTestIndex: clampIndex(session.selectedTestIndex ?? 0, testCases.length),
    chatMessages: session.chatMessages ?? createDefaultChat(),
    validation: normalizeValidation(session.validation),
    stage: session.stage ?? "introduction",
  };
};

const normalizeValidation = (validation?: ValidationResult): ValidationResult =>
  validation ?? createDefaultValidation();

const clampIndex = (index: number, length: number) => {
  if (!Number.isFinite(index) || length <= 0) return 0;
  return Math.min(Math.max(index, 0), length - 1);
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
  const initialProblem = getProblemById(initialProblemId);
  const initialSession = hydrateSession(persisted?.sessions?.[initialProblemId], initialProblem);

  const [currentProblemId, setCurrentProblemId] = useState(initialProblemId);
  const problem = getProblemById(currentProblemId);

  const [language, setLanguageState] = useState<Language>(initialSession.language);
  const [codeByLanguage, setCodeByLanguage] = useState(initialSession.codeByLanguage);
  const [testCases, setTestCases] = useState<TestCase[]>(initialSession.testCases);
  const [selectedTestIndex, setSelectedTestIndex] = useState(initialSession.selectedTestIndex);
  const [chatMessages, setChatMessages] = useState<Message[]>(initialSession.chatMessages);
  const [validationResult, setValidationResult] = useState<ValidationResult>(initialSession.validation);
  const [interviewStage, setInterviewStage] = useState<InterviewStage>(initialSession.stage);

  const code = codeByLanguage[language] ?? getStarterCode(problem, language);
  const setCode = (value: string) => {
    setCodeByLanguage((prev) => ({
      ...prev,
      [language]: value,
    }));
  };

  const selectProblem = (problemId: string) => {
    if (problemId === currentProblemId) return;
    const nextProblem = getProblemById(problemId);
    const stored = readPersistedData();
    const session = hydrateSession(stored?.sessions?.[problemId], nextProblem);

    setCurrentProblemId(problemId);
    setLanguageState(session.language);
    setCodeByLanguage(session.codeByLanguage);
    setTestCases(session.testCases);
    setSelectedTestIndex(session.selectedTestIndex);
    setChatMessages(session.chatMessages);
    setValidationResult(session.validation);
    setInterviewStage(session.stage);
  };

  const setLanguage = (nextLanguage: Language) => {
    if (nextLanguage === language) return;
    setLanguageState(nextLanguage);
  };

  const invalidateValidation = () => {
    setValidationResult((prev) => {
      if (prev.status === "idle") return prev;
      return { status: "idle" };
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    setCodeByLanguage((prev) => {
      if (prev[language]) return prev;
      return {
        ...prev,
        [language]: getStarterCode(problem, language),
      };
    });
  }, [language, problem]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = readPersistedData() ?? { currentProblemId: currentProblemId, sessions: {} };
    const nextData: PersistedData = {
      currentProblemId: currentProblemId,
      sessions: {
        ...existing.sessions,
        [currentProblemId]: {
          language,
          codeByLanguage,
          testCases,
          selectedTestIndex,
          chatMessages,
          validation: validationResult,
          stage: interviewStage,
        },
      },
    };
    writePersistedData(nextData);
  }, [
    currentProblemId,
    language,
    codeByLanguage,
    testCases,
    selectedTestIndex,
    chatMessages,
    validationResult,
    interviewStage,
  ]);

  return (
    <InterviewSessionContext.Provider
      value={{
        code,
        setCode,
        problem,
        availableProblems: problems,
        selectProblem,
        language,
        setLanguage,
        interviewStage,
        setInterviewStage,
        testCases,
        setTestCases,
        selectedTestIndex,
        setSelectedTestIndex,
        chatMessages,
        setChatMessages,
        validationResult,
        setValidationResult,
        invalidateValidation,
      }}
    >
      {children}
    </InterviewSessionContext.Provider>
  );
};
