import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-app text-app flex flex-col">
        <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 max-w-4xl w-full">
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
