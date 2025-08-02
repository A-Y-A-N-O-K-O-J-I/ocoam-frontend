import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ModeratorNavBar from "../components/studentsNavbar";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ClassesList() {
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [openCard, setOpenCard] = useState(null);

  const handleToggleDetails = (id) => {
    setOpenCard(openCard === id ? null : id);
  };

  // Status indicator component
  const StatusIndicator = ({ status }) => {
    const getStatusConfig = () => {
      switch (status?.toLowerCase()) {
        case 'live':
          return {
            color: 'bg-green-500',
            animation: 'animate-pulse',
            label: 'Live'
          };
        case 'scheduled':
          return {
            color: 'bg-yellow-500',
            animation: 'animate-pulse',
            label: 'Scheduled'
          };
        case 'ended':
          return {
            color: 'bg-red-500',
            animation: '',
            label: 'Ended'
          };
        default:
          return {
            color: 'bg-gray-500',
            animation: '',
            label: 'Unknown'
          };
      }
    };

    const config = getStatusConfig();

    return (
      <div className="flex items-center gap-2">
        <div 
          className={`w-3 h-3 rounded-full ${config.color} ${config.animation}`}
          title={config.label}
        ></div>
        <span className="text-xs text-gray-600">{config.label}</span>
      </div>
    );
  };

  // JOIN CLASS FUNCTION - THE IMPORTANT ONE FOR STUDENTS!
  const handleJoinClass = (cls) => {
    if (cls.status?.toLowerCase() !== 'live') {
      alert(`Cannot join class. Status: ${cls.status}. Only live classes can be joined.`);
      return;
    }

    // Redirect to video call as student
    navigate(`/class/${cls.access_code}?role=student`);
  };

  useEffect(() => {
    async function fetchClasses() {
      try {
        const response = await axios.get(`${baseURL}/classes/list-classes`, {
          withCredentials: true,
        });
        setClasses(response.data.classes || []);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    }

    fetchClasses();
    
    // Auto-refresh every 5 seconds to get live status updates
    const interval = setInterval(fetchClasses, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <ModeratorNavBar />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <nav className="w-full bg-blue-500 sticky top-0 z-50 h-10 overflow-hidden transition-all duration-500 ease-in-out">
          <div className="flex justify-center py-2 space-x-5 items-center">
            <p className="md:font-extrabold font-bold text-white">O.C.O.Y.A.M</p>
            <span className="md:font-extrabold font-bold text-white">Student</span>
          </div>
        </nav>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Available Classes</h2>
            <div className="text-sm text-gray-500">
              Auto-refreshing every 5 seconds
            </div>
          </div>

          {classes?.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No classes available
            </p>
          ) : (
            <div className="grid gap-4">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  className="bg-white shadow p-4 rounded-lg mb-4 flex justify-between items-center"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{cls.title}</h3>
                      <StatusIndicator status={cls.status} />
                    </div>
                    <p className="text-sm text-gray-500">{cls.subject}</p>
                    {cls.status?.toLowerCase() === 'live' && (
                      <p className="text-sm text-green-600 font-medium mt-1">
                        🎥 Class is live! You can join now.
                      </p>
                    )}
                    {cls.status?.toLowerCase() === 'scheduled' && (
                      <p className="text-sm text-yellow-600 mt-1">
                        ⏰ Class hasn't started yet. Wait for the moderator.
                      </p>
                    )}
                    {cls.status?.toLowerCase() === 'ended' && (
                      <p className="text-sm text-red-600 mt-1">
                        ❌ Class has ended.
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleJoinClass(cls)}
                      disabled={cls.status?.toLowerCase() !== 'live'}
                      className={`px-4 py-2 rounded font-medium transition-colors ${
                        cls.status?.toLowerCase() === 'live'
                          ? 'bg-green-500 text-white hover:bg-green-600 animate-pulse'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {cls.status?.toLowerCase() === 'live' ? '🎥 Join Class' : 'Join'}
                    </button>

                    <details className="relative group">
                      <summary className="cursor-pointer px-2">⋯</summary>
                      <div className="absolute bg-white shadow p-2 rounded right-0 top-6 text-sm hidden group-open:block z-10 min-w-48">
                        <p className="mb-1">
                          <strong>Access Code:</strong> {cls.access_code}
                        </p>
                        <p className="mb-1">
                          <strong>ID:</strong> {cls.id}
                        </p>
                        <p className="mb-1">
                          <strong>Status:</strong> {cls.status}
                        </p>
                        <p>
                          <strong>Scheduled At:</strong>{" "}
                          {cls.scheduled_at === "now"
                            ? "Now"
                            : new Date(cls.scheduled_at).toLocaleString()}
                        </p>
                      </div>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}