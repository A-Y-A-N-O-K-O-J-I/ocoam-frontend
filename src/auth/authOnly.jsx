// components/AuthOnlyRoute.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthOnlyRoute({ children }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
    const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.post(
          `${baseURL}/auth/verify-token`,
          {},
          { withCredentials: true }
        );

        if (res.data.status === 200) {
          setLoggedIn(true);
          setTimeout(()=>{
              navigate("/dashboard"); // already logged in? go away from login/signup
          },2000)
        } else {
          setLoggedIn(false);
        }
      } catch (err) {
        setLoggedIn(false);
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [navigate]);

  //  if (checking) return <p className="text-center mt-20">🔁 Checking auth status...</p>;

  return !loggedIn ? children : null;
}