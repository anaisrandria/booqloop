export type AuthContextType = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  userId: number | null;
  username: string | null;
};
