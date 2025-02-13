import AuthProvider from "../context/AuthContext.tsx";
import {ReactNode} from "react";

export default function Providers({children}: Readonly<{ children: ReactNode }>) {
  return (
      <AuthProvider>
        {children}
      </AuthProvider>
  )
}