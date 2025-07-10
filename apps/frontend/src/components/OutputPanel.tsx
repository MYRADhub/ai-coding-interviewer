import { useState } from "react";

type TestCase = {
  id: number;
  input: string;
  expected: string;
  actual: string;
  passed: boolean | null;
};

export default function OutputPanel() {
  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: 1,
      input: "1 2 3",
      expected: "6",
      actual: "",
      passed: null,
    },
    {
      id: 2,
      input: "4 5 6",
      expected: "15",
      actual: "",
      passed: null,
    },
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = testCases[selectedIndex];

  return (
    <div className="border border-app bg-app-dark rounded p-2 flex flex-col h-full">
      {/* Tab list */}
      <div className="flex gap-2 mb-2 overflow-x-auto">
        {testCases.map((test, i) => (
          <div
            key={test.id}
            onClick={() => setSelectedIndex(i)}
            className={`border border-app text-sm px-3 py-1 rounded cursor-pointer ${
              selectedIndex === i ? "bg-[var(--primary)] text-black" : "bg-app-light opacity-80"
            }`}
          >
            Test {test.id}
          </div>
        ))}
        <div
          className="bg-app-light border border-app text-sm px-3 py-1 rounded cursor-pointer opacity-50"
          onClick={() =>
            setTestCases((prev) => [
              ...prev,
              {
                id: prev.length + 1,
                input: "",
                expected: "",
                actual: "",
                passed: null,
              },
            ])
          }
        >
          + Add
        </div>
      </div>

      {/* Output area */}
      <div className="flex-1 bg-app-light border border-app rounded p-3 text-sm text-app overflow-y-auto">
        <p><strong>Input:</strong> {selected.input || "Not set"}</p>
        <p><strong>Expected:</strong> {selected.expected || "Not set"}</p>
        <p><strong>Actual:</strong> {selected.actual || "⏳ Not run yet"}</p>
        <p>
          <strong>Result:</strong>{" "}
          {selected.passed === null
            ? "Pending"
            : selected.passed
            ? "✅ Passed"
            : "❌ Failed"}
        </p>
      </div>
    </div>
  );
}
