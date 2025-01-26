import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/userContext";

const UnprotectedRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default UnprotectedRoutes;
