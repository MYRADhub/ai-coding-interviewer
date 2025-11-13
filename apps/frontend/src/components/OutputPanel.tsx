import { useInterviewSession } from "../context/InterviewSessionContext";

export default function OutputPanel() {
  const {
    testCases,
    setTestCases,
    selectedTestIndex,
    setSelectedTestIndex,
    validationResult,
    invalidateValidation,
  } = useInterviewSession();

  const selected = testCases[selectedTestIndex];
  if (!selected) {
    return (
      <div className="border border-app bg-app-dark rounded p-2 flex flex-col h-full items-center justify-center text-app-muted text-sm">
        No test cases defined.
      </div>
    );
  }

  // Add a test case
  const addTestCase = () => {
    invalidateValidation();
    setTestCases((prev) => [
      ...prev,
      {
        id: Date.now(),
        label: `Custom ${prev.length + 1}`,
        input: "",
        expected: "",
        actual: "",
        passed: null,
      },
    ]);
    setSelectedTestIndex(testCases.length); // Select the newly added test
  };

  // Delete a test case
  const deleteTestCase = (id: number, idx: number) => {
    if (testCases.length === 1) return; // Prevent deleting the last case
    invalidateValidation();
    const newCases = testCases.filter((t) => t.id !== id);
    setTestCases(newCases);
    // If you delete the current tab, select the previous one (or the next if deleting first)
    if (selectedTestIndex === idx) {
      setSelectedTestIndex(idx === 0 ? 0 : idx - 1);
    } else if (selectedTestIndex > idx) {
      setSelectedTestIndex((i) => i - 1);
    }
  };

  // Edit input/expected output fields
  const updateSelectedTest = (field: "input" | "expected", value: string) => {
    invalidateValidation();
    setTestCases((prev) =>
      prev.map((t, i) =>
        i === selectedTestIndex ? { ...t, [field]: value } : t
      )
    );
  };

  const formatValidationSummary = () => {
    if (validationResult.status === "idle") {
      return "Not validated yet";
    }
    const total = validationResult.totalCount ?? testCases.length;
    const passed = validationResult.passedCount ?? 0;
    const timestamp = validationResult.lastRunAt
      ? new Date(validationResult.lastRunAt).toLocaleTimeString()
      : null;
    const base = `${passed}/${total} tests passed`;
    return timestamp ? `${base} • ${timestamp}` : base;
  };

  return (
    <div className="border border-app bg-app-dark rounded p-2 flex flex-col h-full">
      {/* Tab list */}
      <div className="flex gap-2 mb-2 overflow-x-auto">
        {testCases.map((test, i) => (
          <div
            key={test.id}
            onClick={() => setSelectedTestIndex(i)}
            className={`relative border border-app text-sm px-3 py-1 rounded cursor-pointer flex items-center ${
              selectedTestIndex === i
                ? "bg-[var(--primary)] text-black"
                : "bg-app-light opacity-80"
            }`}
          >
            {test.label ?? `Test ${i + 1}`}
            {test.hidden && <span className="ml-2 text-xs text-app-muted">👁‍🗨</span>}
            {testCases.length > 1 && (
              <button
                onClick={e => {
                  e.stopPropagation();
                  deleteTestCase(test.id, i);
                }}
                className="ml-2 text-xs text-red-400 hover:text-red-700 focus:outline-none"
                tabIndex={-1}
                title="Delete test case"
              >×</button>
            )}
          </div>
        ))}
        <button
          className="bg-app-light border border-app text-sm px-3 py-1 rounded cursor-pointer opacity-70"
          onClick={addTestCase}
          title="Add test case"
        >
          + Add
        </button>
      </div>
      <div className="flex items-center justify-between text-xs text-app-muted mb-2">
        <span className="uppercase tracking-wide">Validation</span>
        <span
          className={
            validationResult.status === "passed"
              ? "text-green-300"
              : validationResult.status === "failed"
              ? "text-red-300"
              : "text-app-muted"
          }
        >
          {formatValidationSummary()}
        </span>
      </div>

      {/* Output area */}
      <div className="flex-1 bg-app-light border border-app rounded p-3 text-sm text-app overflow-y-auto space-y-3">
        <div>
          <label className="font-semibold block mb-1">Input:</label>
          <input
            className="w-full bg-bg border border-app rounded px-2 py-1 mb-2 text-app"
            value={selected.input}
            onChange={e => updateSelectedTest("input", e.target.value)}
            placeholder="Test case input"
          />
        </div>
        <div>
          <label className="font-semibold block mb-1">Expected Output:</label>
          <input
            className="w-full bg-bg border border-app rounded px-2 py-1 mb-2 text-app"
            value={selected.expected}
            onChange={e => updateSelectedTest("expected", e.target.value)}
            placeholder="Expected output"
          />
        </div>
        <div>
          <label className="font-semibold block mb-1">Actual Output:</label>
          <pre className="bg-bg rounded px-2 py-1 mb-2">{selected.actual ?? "Not run yet"}</pre>
        </div>
        {selected.passed !== null && (
          <div className="font-semibold mt-2">
            {selected.passed ? "✅ Passed" : "❌ Failed"}
          </div>
        )}
      </div>
    </div>
  );
}
