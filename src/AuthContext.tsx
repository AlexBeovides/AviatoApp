import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext({
  token: null as string | null,
  setToken: (value: string | null) => {},
  userRole: null as string | null,
  setUserRole: (value: string | null) => {},
  userAirportId: null as number | null,
  setUserAirportId: (value: number | null) => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userRole, setUserRole] = useState(localStorage.getItem('user_role') || null);
  const [userAirportId, setUserAirportId] = useState(Number(localStorage.getItem('user_airport_id')) || null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      setUserRole(localStorage.getItem('user_role'));
      setUserAirportId(Number(localStorage.getItem('user_airport_id')));
    }
  }, []);

  const value = { 
    token,
    setToken,
    userRole,
    setUserRole,
    userAirportId,
    setUserAirportId,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};