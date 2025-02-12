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
    try {
      const res = await apiClient.login(identifier, password);
      console.log(res);
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
  }

  return (
      <AuthContext.Provider value={{user, signIn, signOut, loading}}>
        {children}
      </AuthContext.Provider>
  );
};