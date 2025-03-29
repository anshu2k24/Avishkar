
import { auth } from "./auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

// Initialize Firestore
const db = getFirestore();

export interface UserData {
  email: string;
  displayName?: string;
  role: 'user' | 'owner' | 'admin';
  createdAt: number;
}

export const getUserRole = async (userId: string): Promise<string> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    
    if (userDoc.exists()) {
      return userDoc.data()?.role || 'user';
    }
    
    return 'user'; // Default role
  } catch (error) {
    console.error("Error getting user role:", error);
    return 'user'; // Default role on error
  }
};

export const setUserAsOwner = async (userId: string): Promise<boolean> => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      // Update existing user
      await setDoc(userRef, { role: 'owner' }, { merge: true });
    } else {
      // Create new user with owner role
      const user = auth.currentUser;
      if (!user) return false;
      
      const userData: UserData = {
        email: user.email || '',
        displayName: user.displayName || '',
        role: 'owner',
        createdAt: Date.now()
      };
      
      await setDoc(userRef, userData);
    }
    
    return true;
  } catch (error) {
    console.error("Error setting user as owner:", error);
    return false;
  }
};
