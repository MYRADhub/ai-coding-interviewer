import Navbar from "../components/Navbar";
import CodingInterviewLayout from "../layouts/CodingInterviewLayout";
import { InterviewSessionProvider } from "../context/InterviewSessionContext";

export default function CodingInterviewPage() {
  return (
    <InterviewSessionProvider>
      <div className="flex flex-col h-full bg-bg text-app">
        <Navbar />
        <CodingInterviewLayout />
      </div>
    </InterviewSessionProvider>
  );
}
