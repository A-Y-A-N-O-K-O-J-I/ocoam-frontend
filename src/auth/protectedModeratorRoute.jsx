// components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedModeratorRoute({ children }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          `${baseURL}/auth/verify-moderator-token`, 
          {}, 
          { withCredentials: true } // 👈 this tells Axios to include cookies
        );

        if (response.data.status === 200) {
          setValid(true);
        } else {
          navigate("/logout");
        }
      } catch (err) {
        console.error(err);
        navigate("/logout");
      } finally {
        setChecking(false);
      }
    };

    verifyToken();
  }, [navigate]);

  if (checking) return <p className="text-center mt-20">🔐 Verifying access...</p>;

  return valid ? children : null;
}