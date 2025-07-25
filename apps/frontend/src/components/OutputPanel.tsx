import { useInterviewSession } from "../context/InterviewSessionContext";

export default function OutputPanel() {
  const {
    testCases,
    setTestCases,
    selectedTestIndex,
    setSelectedTestIndex,
  } = useInterviewSession();

  const selected = testCases[selectedTestIndex];

  return (
    <div className="border border-app bg-app-dark rounded p-2 flex flex-col h-full">
      {/* Tab list */}
      <div className="flex gap-2 mb-2 overflow-x-auto">
        {testCases.map((test, i) => (
          <div
            key={test.id}
            onClick={() => setSelectedTestIndex(i)}
            className={`border border-app text-sm px-3 py-1 rounded cursor-pointer ${
              selectedTestIndex === i ? "bg-[var(--primary)] text-black" : "bg-app-light opacity-80"
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
        {selected ? (
          <>
            <div>
              <span className="font-semibold">Input:</span>
              <pre className="bg-bg rounded px-2 py-1 mb-2">{selected.input}</pre>
            </div>
            <div>
              <span className="font-semibold">Expected Output:</span>
              <pre className="bg-bg rounded px-2 py-1 mb-2">{selected.expected}</pre>
            </div>
            <div>
              <span className="font-semibold">Actual Output:</span>
              <pre className="bg-bg rounded px-2 py-1 mb-2">
                {selected.actual ?? "Not run yet"}
              </pre>
            </div>
            {selected.passed !== null && (
              <div className="font-semibold mt-2">
                {selected.passed ? "✅ Passed" : "❌ Failed"}
              </div>
            )}
          </>
        ) : (
          "No test case selected."
        )}
      </div>
    </div>
  );
}
