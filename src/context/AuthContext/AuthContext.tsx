'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContextType } from './AuthContext.types';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isTokenVerified, setIsTokenVerified] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<{ sub: number }>(token);
      setUserId(decoded.sub);
    }
    setIsLoggedIn(!!token);
    setIsTokenVerified(true);
  }, [login, logout]);

  // empêche le rendu des enfants du Provider tant que la vérification du token n’est pas terminée
  if (!isTokenVerified) return null;

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};
