import Navbar from "../components/Navbar";
import CodingInterviewLayout from "../layouts/CodingInterviewLayout";

export default function CodingPage() {
  return (
    <div className="flex flex-col h-full bg-bg text-app">
      <Navbar />
      <CodingInterviewLayout />
    </div>
  );
}
