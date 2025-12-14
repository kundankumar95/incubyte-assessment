import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const token = localStorage.getItem("auth-token");
  const role = localStorage.getItem("role");

  if (!token || role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
