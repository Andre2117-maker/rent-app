import { createContext } from 'react';

interface AuthContextType {
  token: string | null;
  saveToken: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
