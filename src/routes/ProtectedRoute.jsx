import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="text-2xl font-bold text-primary-container">
        Loading...
      </div>
    );
  }

  if (!user) {
    // return <div className="text-2xl font-bold text-red-500">Error...</div>;
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
