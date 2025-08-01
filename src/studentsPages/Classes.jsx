import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ModeratorNavBar from "../components/ModeratorNavbar";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";

export default function ClassesList() {
  const baseURL = import.meta.env.VITE_API_URL;
  const [classes, setClasses] = useState([]);
  const [openCard, setOpenCard] = useState(null);

  const handleToggleDetails = (id) => {
    setOpenCard(openCard === id ? null : id);
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
            <span className="md:font-extrabold font-bold text-white">Moderator</span>
          </div>
        </nav>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Classes</h2>
            <Button>Create Class</Button>
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
                  <div>
                    <h3 className="text-lg font-semibold">{cls.title}</h3>
                    <p className="text-sm text-gray-500">{cls.subject}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      ▶ Start
                    </button>

                    <details className="relative group">
                      <summary className="cursor-pointer px-2">⋯</summary>
                      <div className="absolute bg-white shadow p-2 rounded right-0 top-6 text-sm hidden group-open:block z-10">
                        <p>
                          <strong>Access Code:</strong> {cls.access_code}
                        </p>
                        <p>
                          <strong>ID:</strong> {cls.id}
                        </p>
                        <p>
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
