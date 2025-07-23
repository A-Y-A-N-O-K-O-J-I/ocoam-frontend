import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MailCheck, RotateCw } from "lucide-react";
import { motion } from "framer-motion";

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const resendEmail = async () => {
    setResending(true);
    setMessage("");
    try {
      const res = await fetch(`${baseURL}/auth/reverify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage("Verification email resent!");
      } else {
        setMessage("Failed to resend verification email.");
      }
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-black"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <MailCheck className="w-16 h-16 mb-4 text-black" />
      <h1 className="text-2xl font-bold mb-2 text-center">
        Verification Email Sent
      </h1>
      <p className="text-center text-sm mb-6">
        A link has been sent to <strong>{email}</strong>. It will expire in 15 minutes.
      </p>

      <Button
        className="bg-black text-white px-6 py-3 text-lg rounded-xl mb-2"
        onClick={resendEmail}
        disabled={resending}
      >
        {resending ? (
          <div className="flex items-center">
            <RotateCw className="animate-spin mr-2" /> Resending...
          </div>
        ) : (
          "Not sent yet? Reverify Email"
        )}
      </Button>

      {message && <p className="text-center text-sm mt-4">{message}</p>}
    </motion.div>
  );
}
