import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../layouts/LoadingSpinner.jsx"
import api from "../api/base.js";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${api}/auth/me`, {
          credentials: "include",
        });
        setOk(res.ok);
      } catch {
        setOk(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <LoadingSpinner/>;
  if (!ok) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;