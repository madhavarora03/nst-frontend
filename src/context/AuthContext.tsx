import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {User} from "../types/interfaces.ts";
import {apiClient} from "../utils/api-client.ts";

interface AuthContextType {
  user?: User;
  loading: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({loading: true});

export const AuthProvider = ({children}: Readonly<{ children: ReactNode }>) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.get_user(token)
          .then(res => setUser(res.user))
          .catch(() => localStorage.removeItem("token"))
          .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
      <AuthContext.Provider value={{user, loading}}>
        {children}
      </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default function useAuth() {
  return useContext(AuthContext);
}