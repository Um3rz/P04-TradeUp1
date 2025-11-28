"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserProfile, User } from "@/lib/userService";


interface UserContextType {
  user: User | null;
  isLoading: boolean;
  checkedAuth: boolean;
  refreshUser: () => Promise<void>;
}


const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  checkedAuth: false,
  refreshUser: async () => {},
});

export const useUser = () => useContext(UserContext);



export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [checkedAuth, setCheckedAuth] = useState(false);

  const refreshUser = async () => {
    setIsLoading(true);
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!token) {
      setUser(null);
      setIsLoading(false);
      setCheckedAuth(true);
      return;
    }
    try {
      const profile = await getUserProfile();
      setUser(profile);
    } catch {
      // If token is present but profile fetch fails, keep loading until fetch completes
      setUser(null);
    } finally {
      setIsLoading(false);
      setCheckedAuth(true);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, checkedAuth, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
