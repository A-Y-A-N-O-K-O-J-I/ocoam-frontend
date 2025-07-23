// pages/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const doLogout = async () => {
      try {
        await axios.get(`${baseURL}/auth/logout`, {
          withCredentials: true, // 🔑 Needed to send the cookie
        });
        navigate('/login'); // ✅ Redirect after logout
      } catch (err) {
        console.error('Logout failed:', err);
        // Even if logout fails, still redirect
        navigate('/login');
      }
    };

    doLogout();
  }, [navigate]);

  return null; // No need to render anything
};

export default Logout;