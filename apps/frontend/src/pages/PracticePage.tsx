import Navbar from '../components/Navbar';
import ProblemDescription from '../components/ProblemDescription';
import EditorPanel from '../components/EditorPanel';

export default function PracticePage() {
  return (
    <div className="h-screen flex flex-col bg-white text-black">
      <Navbar />
      <div className="flex flex-1">
        <ProblemDescription />
        <EditorPanel />
      </div>
    </div>
  );
}