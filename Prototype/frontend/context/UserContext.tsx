"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserProfile, User } from "@/lib/userService";

interface UserContextType {
  user: User | null;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  refreshUser: async () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const refreshUser = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!token) {
      setUser(null);
      // Optionally, redirect to login or show a message here
      return;
    }
    const profile = await getUserProfile();
    setUser(profile);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
