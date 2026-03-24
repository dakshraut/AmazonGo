// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  signInWithEmail, 
  signUpWithEmail, 
  signInWithGoogle, 
  logoutUser,
  onAuthStateChange 
} from '../services/firebase';

// Create and export context
export const AuthContext = createContext();

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const register = async (email, password) => {
    setError(null);
    const result = await signUpWithEmail(email, password);
    if (result.error) setError(result.error);
    return result;
  };

  const login = async (email, password) => {
    setError(null);
    const result = await signInWithEmail(email, password);
    if (result.error) setError(result.error);
    return result;
  };

  const googleSignIn = async () => {
    setError(null);
    const result = await signInWithGoogle();
    if (result.error) setError(result.error);
    return result;
  };

  const logout = async () => {
    setError(null);
    const result = await logoutUser();
    if (result.error) setError(result.error);
    return result;
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    googleSignIn,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};