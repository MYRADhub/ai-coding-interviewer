import type {
  InterviewStage,
  Language,
  Message,
  SessionHistoryEntry,
  TestCase,
  ValidationResult,
} from "./types";

export const SESSION_STORAGE_KEY = "ai-coding-interviewer::session";

export type SessionSlice = {
  language: Language;
  codeByLanguage: Partial<Record<Language, string>>;
  testCases: TestCase[];
  selectedTestIndex: number;
  chatMessages: Message[];
  validation: ValidationResult;
  stage: InterviewStage;
  startedAt: number;
};

export type PersistedData = {
  currentProblemId: string;
  sessions: Record<string, SessionSlice>;
  history: SessionHistoryEntry[];
};

export const readPersistedData = (): PersistedData | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (!parsed.history) parsed.history = [];
    return parsed as PersistedData;
  } catch {
    return null;
  }
};

export const writePersistedData = (data: PersistedData) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data));
};
