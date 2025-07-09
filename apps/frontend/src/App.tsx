import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CodingInterview from "./pages/CodingInterview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coding" element={<CodingInterview />} />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App
