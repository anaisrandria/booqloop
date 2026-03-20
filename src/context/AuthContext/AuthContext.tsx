'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { AuthContextType } from './AuthContext.types';
import { getCurrentUser } from '../../lib/services/users/users';
import { loginUser } from '../../lib/services/admin/login';
import { logoutUser } from '../../lib/services/admin/logout';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isTokenVerified, setIsTokenVerified] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Vérifie la session au chargement en appelant le serveur
  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUserId(currentUser.user_id);
        setUsername(currentUser.username);
        setIsLoggedIn(true);
      } catch {
        // Pas de session valide
      } finally {
        setIsTokenVerified(true);
      }
    };
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    await loginUser({ email, password });
    const currentUser = await getCurrentUser();
    setUserId(currentUser.user_id);
    setUsername(currentUser.username);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await logoutUser();
    setUserId(null);
    setUsername(null);
    setIsLoggedIn(false);
  };

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
