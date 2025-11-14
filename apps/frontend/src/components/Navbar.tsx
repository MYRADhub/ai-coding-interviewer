import { useCurrentUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const user = useCurrentUser();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full px-6 py-3 flex justify-between items-center bg-app-dark border-b border-app text-app">
      <Link to="/" className="text-lg font-bold hover:text-[var(--primary)] transition">
        AI Coding Interviewer
      </Link>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="text-sm border border-app rounded px-3 py-1 text-app-muted hover:text-app transition"
        >
          {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.avatarUrl}
              alt="Avatar"
              className="w-8 h-8 rounded-full border border-app"
            />
            <span className="text-sm font-medium text-app">{user.name}</span>
          </div>
        ) : (
          <p className="text-muted text-sm">Not signed in</p>
        )}
      </div>
    </nav>
  );
}
