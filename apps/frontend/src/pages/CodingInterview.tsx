import Navbar from "../components/Navbar";
import ProblemDescription from "../components/ProblemDescription";
import EditorPanel from "../components/EditorPanel";

export default function CodingInterview() {
  return (
    <div className="flex flex-col h-full bg-bg text-app">
      <Navbar />
      <div className="flex flex-1 h-full overflow-hidden">
        <ProblemDescription />
        <EditorPanel />
      </div>
    </div>
  );
}
