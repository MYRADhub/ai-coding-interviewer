export type Problem = {
  id: string;
  title: string;
  description: string;
  examples: {
    input: string;
    output: string;
  }[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export type TestCase = {
  id: number;
  input: string;
  expected: string;
  actual: string;
  passed: boolean | null;
};

export type Message = {
  sender: "user" | "agent";
  text: string;
};