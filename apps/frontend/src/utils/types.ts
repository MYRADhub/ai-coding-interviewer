export type Language = "python" | "javascript";

export type ProblemExample = {
  input: string;
  output: string;
  explanation?: string;
};

export type ProblemTestTemplate = {
  label?: string;
  input: string;
  expected: string;
  hidden?: boolean;
};

export type ProblemDetails = {
  markdown?: string;
  constraints?: string[];
  followUps?: string[];
  hints?: string[];
};

export type Problem = {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  defaultLanguage?: Language;
  examples: ProblemExample[];
  sampleTests: ProblemTestTemplate[];
  starterCode: Partial<Record<Language, string>>;
  details?: ProblemDetails;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export type TestCase = {
  id: number;
  label?: string;
  input: string;
  expected: string;
  actual: string;
  passed: boolean | null;
  hidden?: boolean;
};

export type ValidationResultStatus = "idle" | "passed" | "failed";

export type ValidationResult = {
  status: ValidationResultStatus;
  lastRunAt?: number;
  totalCount?: number;
  passedCount?: number;
};

export type Message = {
  sender: "user" | "agent";
  text: string;
};

export type InterviewStage =
  | "introduction"
  | "clarification"
  | "guidance"
  | "wrap_up";
