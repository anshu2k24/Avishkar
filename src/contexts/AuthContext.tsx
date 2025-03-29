
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, loginUser, registerUser, signInWithGoogle, signOut } from "@/server/firebase/auth";
import { onAuthStateChanged, User } from "firebase/auth";
import { getUserRole } from "@/server/firebase/userService";

// Define the type for our auth context
type AuthContextType = {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string) => Promise<User>;
  googleSignIn: () => Promise<User>;
  logout: () => Promise<void>;
  isOwner: boolean;
  setIsOwner: (value: boolean) => void;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      // Check if user is owner when auth state changes
      if (user) {
        try {
          const role = await getUserRole(user.uid);
          setIsOwner(role === 'owner' || role === 'admin');
        } catch (error) {
          console.error("Error checking user role:", error);
        }
      } else {
        setIsOwner(false);
      }
      
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isLoading,
    login: loginUser,
    register: registerUser,
    googleSignIn: signInWithGoogle,
    logout: signOut,
    isOwner,
    setIsOwner,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
