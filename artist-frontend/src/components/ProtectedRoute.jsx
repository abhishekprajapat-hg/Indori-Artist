// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("userToken");

  if (!token) {
    // not logged in → redirect
    return <Navigate to="/login" replace />;
  }

  return children;
}
