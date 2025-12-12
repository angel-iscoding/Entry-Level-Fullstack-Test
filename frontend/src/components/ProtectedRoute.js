import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext.js";
import { ROUTES } from "../routes.js";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to={ROUTES.HOME} replace />;

  return <Outlet />;
};
