import { useCurrentUser } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const user = useCurrentUser();

  return (
    <nav className="w-full px-6 py-3 flex justify-between items-center bg-app-dark border-b border-app text-app">
      <Link to="/" className="text-lg font-bold hover:text-[var(--primary)] transition">
        AI Coding Interviewer
      </Link>

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
    </nav>
  );
}
