import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

const AdminProtectedRoute = () => {
  const { admin, adminLoading, isAdminAuthenticated } = useAuth();
  const location = useLocation();

  if (adminLoading) {
    return (
      <div className="text-2xl font-bold text-primary-container">
        Loading...
      </div>
    );
  }

  if (!admin && !isAdminAuthenticated) {
    // return <div className="text-2xl font-bold text-red-500">Error...</div>;
    return <Navigate to="./login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default AdminProtectedRoute;
