import {Outlet, useNavigate} from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import useAuth from "../hooks/useAuth";
import {useEffect} from "react";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const {user, loading} = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-spinner loading-xl text-accent"/>
        </div>
    );
  }

  return (
      <>
        <Header/>
        <div className="md:min-h-[calc(100vh-9rem-12px)] min-h-[calc(100vh-9rem-48px)] bg-base-300">
          <Outlet/>
        </div>
        <Footer/>
      </>
  );
}