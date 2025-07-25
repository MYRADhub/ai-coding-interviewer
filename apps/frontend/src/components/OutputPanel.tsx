import { useState } from "react";
import { useInterviewSession } from "../context/InterviewSessionContext";

export default function OutputPanel() {
  const { testCases, setTestCases } = useInterviewSession();

  const [selectedIndex, setSelectedIndex] = useState(0);

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
        {"Run your code to see results."}
      </div>
    </div>
  );
}
