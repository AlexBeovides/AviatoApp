import React, { useState, useContext } from 'react';

export const AuthContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
  userRole: null,
  setUserRole: (value: null) => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Load the initial state from localStorage here if needed

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userRole,
    setUserRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};