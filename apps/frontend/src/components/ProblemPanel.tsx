import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useInterviewSession } from "../context/InterviewSessionContext";

export default function ProblemPanel() {
  const { problem, availableProblems, selectProblem, validationResult } = useInterviewSession();
  const { id, title, description, examples, difficulty, topics, details } = problem;
  const renderStatus = () => {
    switch (validationResult.status) {
      case "passed":
        return (
          <span className="text-xs font-semibold text-green-300 bg-green-500/10 px-2 py-1 rounded-full">
            ✅ All tests passed
          </span>
        );
      case "failed":
        return (
          <span className="text-xs font-semibold text-red-300 bg-red-500/10 px-2 py-1 rounded-full">
            ❌ Tests failing
          </span>
        );
      default:
        return (
          <span className="text-xs font-semibold text-app-muted bg-app-light/40 px-2 py-1 rounded-full">
            Tests not run
          </span>
        );
    }
  };

  return (
    <div className="border border-app bg-app-dark rounded-lg p-4 overflow-y-auto h-full shadow-sm">
      <div className="flex flex-col gap-2 mb-3">
        <label className="text-xs uppercase tracking-wide text-app-muted">Problem</label>
        <select
          value={problem.id}
          onChange={(e) => selectProblem(e.target.value)}
          className="bg-app-light border border-app rounded px-2 py-1 text-sm text-app focus:outline-none"
        >
          {availableProblems.map((p) => (
            <option key={p.id} value={p.id}>
              {p.id}. {p.title}
            </option>
          ))}
        </select>
      </div>
      <h2 className="font-bold text-lg mb-1">
        {id}. {title}
      </h2>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        {renderStatus()}
        <span className="text-xs uppercase tracking-wide text-app-muted">{difficulty}</span>
      </div>
      <p className="text-sm text-app-muted mb-4">{description}</p>
      {topics?.length ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {topics.map((topic) => (
            <span
              key={topic}
              className="text-xs border border-app rounded-full px-3 py-1 text-app-muted"
            >
              {topic}
            </span>
          ))}
        </div>
      ) : null}

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
      {details?.markdown && (
        <div className="mt-4 text-sm border border-app rounded p-3 bg-app-light">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="space-y-2 leading-relaxed markdown-body"
          >
            {details.markdown}
          </ReactMarkdown>
        </div>
      )}
      {details?.constraints && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-1">Constraints</h4>
          <ul className="text-sm text-app-muted list-disc list-inside space-y-1">
            {details.constraints.map((constraint, idx) => (
              <li key={idx}>{constraint}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
