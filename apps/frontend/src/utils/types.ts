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