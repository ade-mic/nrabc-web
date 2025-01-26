import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  // Sign out function
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      console.log("Successfully signed out");
    } catch (error) {
      console.error("Sign out error:", error.message);
    }
  };

  const value = {
    currentUser,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
