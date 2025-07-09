import type { Problem } from "../utils/types";

const mockProblem: Problem = {
  id: "3098",
  title: "Find the Sum of Subsequence Powers",
  description:
    "You are given an integer array nums of length n, and a positive integer k. Return the sum of powers of all subsequences of length k.",
  examples: [
    {
      input: "nums = [1,2,3,4], k = 3",
      output: "5",
    },
  ],
};

export default function ProblemPanel() {
  const { id, title, description, examples } = mockProblem;

  return (
    <div className="border border-app bg-app-dark rounded p-4 overflow-y-auto">
      <h2 className="font-bold text-lg mb-1">
        {id}. {title}
      </h2>
      <p className="text-sm text-app-muted mb-4">{description}</p>

      <div className="text-sm bg-app-light border border-app rounded p-3">
        {examples.map((ex, i) => (
          <div key={i} className="mb-2">
            <div className="text-app-muted">
              <strong>Input:</strong> {ex.input}
            </div>
            <div className="text-app-muted">
              <strong>Output:</strong> {ex.output}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
