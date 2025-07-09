import { createContext, useContext } from "react";
import type { User } from "../utils/types";

export const dummyUser: User = {
  id: "user_001",
  name: "Murad",
  email: "murad@example.com",
  avatarUrl: "https://ui-avatars.com/api/?name=Murad",
};

export const UserContext = createContext<User | null>(null);

export function useCurrentUser() {
  return useContext(UserContext);
}
