import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {

  const { user, loading } = useContext(AuthContext);

  // Wait for AuthContext to load
  if (loading) {
    return null;
  }

  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in
  return children;
}

export default ProtectedRoute;