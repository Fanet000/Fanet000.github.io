import React, { createContext, useState, ReactNode } from "react";

// Define the context value type
interface UserProfile {
  name: string;
  achievements: string[];
}

interface UserProfileContextType {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

// Create context with correct type (nullable or default value if you prefer)
export const UserProfileContext = createContext<UserProfileContextType | null>(null);

// Define props for the provider
interface UserProfileProviderProps {
  children: ReactNode;
}

// Use the typed props in your provider
export function UserProfileProvider({ children }: UserProfileProviderProps) {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Guest",
    achievements: [],
  });

  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}
