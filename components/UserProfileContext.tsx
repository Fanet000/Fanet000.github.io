import React, { createContext, useState, ReactNode } from "react";

// Define the user profile structure
interface UserProfile {
  name: string;
  achievements: string[];
}

// Define the context value type
interface UserProfileContextType {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

// Initialize context with the correct type
export const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

// Define props for the provider
interface UserProfileProviderProps {
  children: ReactNode;
}

// Define the provider component
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
