import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token = localStorage.getItem("token");

  // Not logged in
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin access granted
  return children;
}

export default AdminRoute;