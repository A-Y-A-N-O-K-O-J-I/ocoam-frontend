import { Card, CardContent } from "@/components/ui/card";
import StudentNavBar from "../components/studentsNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function BecomeModerator() {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const baseURL = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${baseURL}/auth/become-moderator`, {key},{
        withCredentials:true
      });
      if(res.data.status === 200){
        setSuccess(true);
        setTimeout(() => {
          navigate("/moderator/dashboard");
        }, 2000);
      }
    } catch (err) {
      if(err?.response?.data?.status === 409){
        setError(err?.response?.data?.message || "Something went wrong");
        setTimeout(() => {
          navigate("/moderator/dashboard");
        }, 2000);
      }
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <StudentNavBar />
      <div className="flex-1">
        <nav className="w-full bg-blue-500 sticky top-0 z-50 h-10 overflow-hidden transition-all duration-500 ease-in-out">
          <div className="flex justify-center py-2 space-x-5 items-center">
            <p className="md:font-extrabold font-bold text-white">
              O.C.O.Y.A.M
            </p>
            <span className="md:font-extrabold font-bold text-white">
              Students
            </span>
          </div>
        </nav>

        <div className="p-4 flex justify-center items-center h-[90%]">
          <Card className="w-full max-w-md shadow-2xl border-blue-500 border">
            <CardContent className="p-6 space-y-4">
              {success ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="text-center text-green-600 font-bold text-lg"
                >
                  You are now a Moderator ✅
                </motion.div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-center">
                    Admin Key Required 🔐
                  </h2>
                  <Input
                    placeholder="Enter Moderator Key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                  />
                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}
                  <Button
                    disabled={loading || !key}
                    onClick={handleSubmit}
                    className="w-full"
                  >
                    {loading ? "Verifying..." : "Submit"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BecomeModerator;
