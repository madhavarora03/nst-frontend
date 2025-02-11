import {Outlet, useNavigate} from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import useAuth from "../context/AuthContext.tsx";
import {useEffect} from "react";
import {Loader2} from "lucide-react";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const {user, loading} = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin w-12 h-12 text-accent"/>
        </div>
    );
  }

  return (
      <>
        <Header/>
        <div className="min-h-[calc(100vh-10rem)] bg-base-300">
          <Outlet/>
        </div>
        <Footer/>
      </>
  );
}