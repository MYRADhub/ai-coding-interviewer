import { useCurrentUser } from "../context/UserContext";

export default function Navbar() {
  const user = useCurrentUser();

  if (!user) {
    return (
      <p className="text-center text-muted bg-app p-2 border-b border-app">
        Please sign in to use this feature.
      </p>
    );
  }

  return (
    <div className="w-full p-4 bg-app-dark text-app shadow border-b border-app flex justify-between items-center">
      <div className="text-xl font-bold">AI Coding Interviewer</div>

      <div className="flex items-center gap-2">
        <img
          src={user.avatarUrl}
          alt="Avatar"
          className="w-8 h-8 rounded-full border border-app"
        />
        <span className="text-sm font-medium text-app">{user.name}</span>
      </div>
    </div>
  );
}
