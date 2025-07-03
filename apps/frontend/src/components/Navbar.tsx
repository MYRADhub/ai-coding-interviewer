import { useCurrentUser } from "../context/UserContext";

export default function Navbar() {
  const user = useCurrentUser();
  if (!user) {
    return <p className="text-center text-gray-500">Please sign in to use this feature.</p>;
  }

  return (
    <div className="w-full p-4 bg-white shadow text-xl font-bold border-b">
      AI Coding Interviewer
      <div className="flex items-center gap-2">
        <img src={user.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full" />
          <span className="text-sm font-medium">{user.name}</span>
        </div>
    </div>
  );
}