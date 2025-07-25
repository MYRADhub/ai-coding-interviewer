import { useInterviewSession } from "../context/InterviewSessionContext";

export default function ProblemPanel() {
  const { problem } = useInterviewSession();
  const { id, title, description, examples } = problem;

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
