import {User} from "../types/interfaces.ts";
import {createContext, useContext} from "react";

export interface SignInProps {
  identifier: string;
  password: string;
}

export interface AuthContextType {
  user?: User;
  signIn?: (credentials: SignInProps) => Promise<void>;
  signOut?: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({loading: true});

export default function useAuth() {
  return useContext(AuthContext);
}