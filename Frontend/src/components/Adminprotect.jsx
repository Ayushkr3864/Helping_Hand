import {jwtDecode} from "jwt-decode";
import { Navigate } from "react-router-dom";

export default function Adminprotect({ children }) {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("adminToken");
      return <Navigate to="/admin/login" replace />;
    }

    // ✅ Check role
    if (decoded.role !== "admin") {
      return <Navigate to="/" replace />; // send to user home if not admin
    }
  } catch (err) {
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
