
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { toast } from "@/hooks/use-toast";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Helper functions for authentication
export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    toast({
      title: "Account created successfully",
      description: "You have been registered with DwellNest!",
    });
    return userCredential.user;
  } catch (error: any) {
    const errorMessage = error.message || "Failed to register";
    toast({
      title: "Registration failed",
      description: errorMessage,
      variant: "destructive",
    });
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    toast({
      title: "Login successful",
      description: "Welcome back to DwellNest!",
    });
    return userCredential.user;
  } catch (error: any) {
    const errorMessage = error.message || "Failed to login";
    toast({
      title: "Login failed",
      description: errorMessage,
      variant: "destructive",
    });
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    toast({
      title: "Login successful",
      description: "Welcome to DwellNest!",
    });
    return result.user;
  } catch (error: any) {
    const errorMessage = error.message || "Failed to login with Google";
    toast({
      title: "Login failed",
      description: errorMessage,
      variant: "destructive",
    });
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    toast({
      title: "Logged out",
      description: "You have been logged out from DwellNest",
    });
  } catch (error: any) {
    const errorMessage = error.message || "Failed to log out";
    toast({
      title: "Logout failed",
      description: errorMessage,
      variant: "destructive",
    });
    throw error;
  }
};
