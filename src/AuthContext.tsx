import React, { useState, useEffect,useContext } from 'react';

export const AuthContext = React.createContext({
  token: null as string | null,
  setToken: (value: string | null) => {},
  userRole: null as string | null,
  setUserRole: (value: string | null) => {},
  userName: null as string | null,
  setUserName: (value: string | null) => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userRole, setUserRole] = useState(localStorage.getItem('user_role') || null);
  const [userName, setUserName] = useState(localStorage.getItem('user_name') || null);

  useEffect(() => {
    // Load the initial state from localStorage here if needed
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      setUserName(localStorage.getItem('user_name'));
      setUserRole(localStorage.getItem('user_role'));
    }
  }, []);

  // Load the initial state from localStorage here if needed 

  const value = { 
    token,
    setToken,
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