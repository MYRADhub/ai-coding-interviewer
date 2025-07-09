import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CodingPage from "./pages/CodingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coding" element={<CodingPage />} />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App
