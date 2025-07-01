import { createContext, useContext } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export const dummyUser: User = {
  id: "user_001",
  name: "Murad",
  email: "murad@example.com",
  avatarUrl: "https://ui-avatars.com/api/?name=Murad",
};

export const UserContext = createContext<User>(dummyUser);

export function useCurrentUser() {
  return useContext(UserContext);
}
