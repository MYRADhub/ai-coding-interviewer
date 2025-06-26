import Navbar from "../components/Navbar";
import ProblemDescription from "../components/ProblemDescription";
import EditorPanel from "../components/EditorPanel";

export default function PracticePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <ProblemDescription />
        <EditorPanel />
      </div>
    </div>
  );
}
