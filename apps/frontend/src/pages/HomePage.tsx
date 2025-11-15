import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { problems } from "../data/problems";
import type { ValidationResultStatus, SessionHistoryEntry } from "../utils/types";
import { readPersistedData, SESSION_STORAGE_KEY } from "../utils/sessionStorage";

type ProblemProgressMap = Record<string, ValidationResultStatus>;

export default function HomePage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<ProblemProgressMap>({});
  const [history, setHistory] = useState<SessionHistoryEntry[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadProgress = () => {
      const data = readPersistedData();
      if (!data?.sessions) {
        setProgress({});
        setHistory([]);
        return;
      }
      const map: ProblemProgressMap = {};
      Object.entries(data.sessions).forEach(([problemId, session]) => {
        map[problemId] = session.validation?.status ?? "idle";
      });
      setProgress(map);
      setHistory(data.history ?? []);
    };

    loadProgress();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === SESSION_STORAGE_KEY) {
        loadProgress();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="h-full min-h-screen bg-app text-app flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-5xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InterviewCard
              title="Coding Interview"
              description="Practice solving problems with an AI interviewer."
              onClick={() => navigate("/coding")}
            />
            <InterviewCard
              title="System Design"
              description="Coming soon."
              disabled
            />
            <InterviewCard
              title="Behavioral Interview"
              description="Coming soon."
              disabled
            />
          </div>

          <ProblemProgressList progress={progress} />
          <SessionHistoryList history={history} />
        </div>
      </div>
    </div>
  );
}

function InterviewCard({
  title,
  description,
  onClick,
  disabled = false,
}: {
  title: string;
  description: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`p-6 rounded-xl border border-app cursor-pointer transition hover:scale-105 
      ${disabled ? "opacity-30 cursor-not-allowed" : "hover:border-primary bg-app-dark"}`}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted text-sm">{description}</p>
    </div>
  );
}

function ProblemProgressList({ progress }: { progress: ProblemProgressMap }) {
  const solvedCount = problems.filter((problem) => progress[problem.id] === "passed").length;

  return (
    <div className="bg-app-dark border border-app rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Problem Progress</h3>
          <p className="text-sm text-muted">Auto-saved locally across sessions</p>
        </div>
        <span className="text-sm text-muted">
          {solvedCount}/{problems.length} solved
        </span>
      </div>
      <div className="space-y-3">
        {problems.map((problem) => (
          <ProblemProgressRow
            key={problem.id}
            problemTitle={`${problem.id}. ${problem.title}`}
            status={progress[problem.id] ?? "idle"}
          />
        ))}
      </div>
    </div>
  );
}

function ProblemProgressRow({
  problemTitle,
  status,
}: {
  problemTitle: string;
  status: ValidationResultStatus;
}) {
  const { label, className } = statusBadgeProps(status);
  return (
    <div className="flex items-center justify-between border border-app rounded-lg px-4 py-3 bg-app">
      <span className="text-sm font-medium">{problemTitle}</span>
      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${className}`}>{label}</span>
    </div>
  );
}

function statusBadgeProps(status: ValidationResultStatus) {
  switch (status) {
    case "passed":
      return { label: "Solved", className: "text-green-300 bg-green-500/10" };
    case "failed":
      return { label: "Needs work", className: "text-red-300 bg-red-500/10" };
    default:
      return { label: "Not started", className: "text-app-muted bg-app-light/40" };
  }
}

function SessionHistoryList({ history }: { history: SessionHistoryEntry[] }) {
  const recent = history.slice(0, 6);

  return (
    <div className="bg-app-dark border border-app rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Recent Sessions</h3>
          <p className="text-sm text-muted">Last {recent.length || 0} interview attempts</p>
        </div>
      </div>
      {recent.length === 0 ? (
        <p className="text-sm text-muted">No sessions yet. Start a new interview to begin tracking.</p>
      ) : (
        <div className="space-y-3">
          {recent.map((entry) => {
            const badge = statusBadgeProps(entry.status);
            return (
              <div
                key={entry.id}
                className="flex items-center justify-between border border-app rounded-lg px-4 py-3 bg-app text-sm"
              >
                <div>
                  <div className="font-medium">{entry.problemTitle}</div>
                  <div className="text-xs text-muted">
                    {new Date(entry.completedAt).toLocaleString()} • {entry.language.toUpperCase()}
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badge.className}`}>
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
