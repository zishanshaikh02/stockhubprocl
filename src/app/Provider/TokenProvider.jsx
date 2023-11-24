"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProviders({ children }) {
  const [authTokens, setAuthTokens] = useState(null);

  useEffect(() => {
    const storedTokens = localStorage.getItem('authTokens');
    if (storedTokens) {
      setAuthTokens(JSON.parse(storedTokens));
    }
  }, []); // This effect runs only once when the component mounts

  const removeAuthTokens = () => {
    // Remove the authTokens from localStorage
    localStorage.removeItem('authTokens');

    // Set authTokens to null
    setAuthTokens(null);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens, removeAuthTokens }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
