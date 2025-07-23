import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // New states for error handling
  const [error, setError] = useState(null);

  // Redirect countdown effect
  useEffect(() => {
    if (done) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            navigate("/login");
          }
          return prev - 1;
        });
      }, 1500);
    }
  }, [done, navigate]);

  // If no token, show error early and skip rendering form
  if (!token) {
    return (
      <div className="w-full max-w-sm mx-auto mt-20 text-center text-red-600">
        <p>Invalid or missing token. Please check your reset link.</p>
      </div>
    );
  }

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
if (newPassword.length < 6) {
  setError("Password must be at least 6 characters.");
  setLoading(false);
  return;
}
    try {
      await axios.post(`${baseURL}/auth/reset-password`, {
        token,
        newPassword,
      });
      setDone(true);
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        if (status === 400 || status === 410) {
          setError(err.response.data.message || "Invalid or expired token.");
        } else if (status === 500) {
          setError("Oops, an error occurred omo...");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-20">
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.form
            key="reset-form"
            onSubmit={handleReset}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-center">Reset Password</h2>

            {error && (
              <p className="text-center text-red-600 font-medium">{error}</p>
            )}

            <div className="relative">
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </motion.form>
        ) : (
          <motion.div
            key="done-msg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-green-600 font-medium space-y-2"
          >
            <p>✅ Password has been reset successfully!</p>
            <p>🔁 Redirecting to login in {countdown}...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}