import {ReactNode, useEffect, useState} from "react";
import {User} from "../types/interfaces.ts";
import {apiClient} from "../utils/api-client.ts";
import axios from "axios";
import {AuthContext, SignInProps} from "../hooks/useAuth";


export const AuthProvider = ({children}: Readonly<{ children: ReactNode }>) => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    apiClient.get_user()
        .then(res => setUser(res.user))
        .catch(() => setUser(undefined))
        .finally(() => setLoading(false));
  }, []);

  const signIn = async ({identifier, password}: SignInProps) => {
    setLoading(true);
    try {
      const res = await apiClient.login(identifier, password);
      if (res.user) {
        setUser(res.user);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await apiClient.logout();
      setUser(undefined);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
      <AuthContext.Provider value={{user, signIn, signOut, loading}}>
        {children}
      </AuthContext.Provider>
  );
};