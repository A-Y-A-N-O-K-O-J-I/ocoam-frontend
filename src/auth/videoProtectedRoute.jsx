import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ClassStatusWrapper({ children }) {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [bgColor, setBgColor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClassStatus() {
      try {
        const baseURL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${baseURL}/classes/list-classes`);
        const data = await res.json();

        const classStatus = data.classes[0]?.status;

        if (classStatus === "ended") {
          setMessage("Class has ended.");
          setBgColor("bg-red-500");
          setTimeout(() => navigate("/login"), 2000);
        } else if (classStatus === "scheduled") {
          setMessage("Class hasn't started yet.");
          setBgColor("bg-green-500");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setStatus("live");
        }
      } catch (err) {
        console.error("Failed to fetch class status", err);
      }
    }

    fetchClassStatus();
  }, [navigate]);

  if (status !== "live") {
    return (
      <div className={`w-full h-screen flex items-center justify-center text-white text-2xl font-bold ${bgColor}`}>
        {message}
      </div>
    );
  }

  return children;
}

export default ClassStatusWrapper;
