import { Outlet, useNavigate } from "react-router";
import useAuth from "../context/AuthContext";
import { useEffect } from "react";

export default function AuthOutlet() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-spinner loading-xl text-accent" />
        </div>
    );
  }

  return (
      <div className="min-h-screen">
        <Outlet />
      </div>
  );
}