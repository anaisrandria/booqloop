'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContextType } from './AuthContext.types';
import { getUserById } from '../../lib/services/users/getUserById';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isTokenVerified, setIsTokenVerified] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const login = (token: string) => {
    localStorage.setItem('token', token);

    const decoded = jwtDecode<{ sub: number }>(token);
    setUserId(decoded.sub);

    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');

    setUserId(null);
    setUsername(null);
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
  }, []);

  useEffect(() => {
    const loadUsername = async () => {
      if (userId) {
        const name = await getUserById(userId);
        if (name) setUsername(name.username);
      }
    };
    loadUsername();
  }, [userId]);

  // empêche le rendu des enfants du Provider tant que la vérification du token n’est pas terminée
  if (!isTokenVerified) return null;

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userId, username }}
    >
      {children}
    </AuthContext.Provider>
  );
};
