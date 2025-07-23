import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const baseURL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${baseURL}/auth/forgot-password`, { email });
      setSubmitted(true);
    } catch (err) {
        if (err.response) {
    const { status, data } = err.response;
    if (status === 404) {
      setError("Email not found.");
    } else if (status === 400) {
      setError(data?.message || "Please provide a valid email.");
    } else if (status === 500) {
      setError("Oops! Something went wrong. Try again later.");
    } else {
      setError("Unexpected error. Try again.");
    }
  } else {
    setError("Network error or server unreachable.");
  }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-20">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-center">Forgot Password</h2>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-red-600 text-sm text-center"
  >
    {error}
  </motion.div>
)}
            <Button disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </motion.form>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-green-600 font-medium"
          >
            Reset password link sent! 📩
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}