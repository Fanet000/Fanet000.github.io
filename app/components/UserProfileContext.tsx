// context/UserProfileContext.tsx
import React, { createContext, useState } from "react";
export const UserProfileContext = createContext(null);
export function UserProfileProvider({ children }) {
  const [profile, setProfile] = useState({ name: "Guest", achievements: [] });
  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}