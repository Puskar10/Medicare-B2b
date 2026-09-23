
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("curamed_user");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let user = null;

  try {
    user = storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch (error) {
    console.error("Invalid stored user:", error);
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/products" replace />;
  }

  return children;
}

