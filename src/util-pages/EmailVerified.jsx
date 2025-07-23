import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
export default function EmailVerified() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


const hasSent = useRef(false);
const navigate = useNavigate()

const [countdown, setCountdown] = useState(3);

useEffect(() => {
  if (hasSent.current) return;
  hasSent.current = true;

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
const baseURL = import.meta.env.VITE_API_URL;

  if (!token) {
    setError("No token found in URL");
    setLoading(false);
    return;
  }

  axios.post(`${baseURL}/auth/verify-email`, { token })
    .then(() => {
      setLoading(false);

      let timeLeft = 3;
      const interval = setInterval(() => {
        timeLeft -= 1;
        setCountdown(timeLeft);

        if (timeLeft === 0) {
          clearInterval(interval);
          navigate("/login");
        }
      }, 1000);
    })
    .catch(() => {
      setError("Failed to verify email.");
      setLoading(false);
    });
}, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Verifying your email...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, scale: 0.85, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16" />
        </div>
        <h1 className="text-2xl font-bold">Email Verified</h1>
        <p className="text-gray-500">Your email has been successfully verified.</p>
      <Button className="mt-4">
  {countdown > 0 ? `Redirecting to login in ${countdown}` : "Redirecting..."}
</Button>
      </motion.div>
    </div>
  );
}
