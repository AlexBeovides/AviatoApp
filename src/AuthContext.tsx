import React, { useState, useContext } from 'react';

export const AuthContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
  userRole: null as string | null,
  setUserRole: (value: string | null) => {},
  userName: null as string | null,
  setUserName: (value: string | null) => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || null);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || null);

  // Load the initial state from localStorage here if needed

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userRole,
    setUserRole,
    userName,
    setUserName,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};