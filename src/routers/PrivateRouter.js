import { Navigate } from "react-router-dom";

export default function PrivateRouter({ children, role }) {
  const currentRole = localStorage.getItem("role");

  if (!currentRole) {
    return <Navigate to="/login" replace />;
  }

  if (role && currentRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
