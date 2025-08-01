import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import ModeratorNavBar from "../components/ModeratorNavbar";
import axios from "axios";

export default function TeachersList() {
  const baseURL = import.meta.env.VITE_API_URL;

  const [teachers, setTeachers] = useState([]);
  const [openCard, setOpenCard] = useState(null);

  const handleToggleDetails = (id) => {
    setOpenCard(openCard === id ? null : id);
  };

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const response = await axios.get(`${baseURL}/moderator/teachers`, {
          withCredentials: true,
        });
        setTeachers(response.data.teachers || []);
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
      }
    }

    fetchTeachers();
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ModeratorNavBar />

      <div className="flex-1">
        <nav className="w-full bg-blue-500 sticky top-0 z-50 h-10 overflow-hidden transition-all duration-500 ease-in-out">
          <div className="flex justify-center py-2 space-x-5 items-center">
            <p className="md:font-extrabold font-bold text-white"> O.C.O.Y.A.M</p>
            <span className="md:font-extrabold font-bold text-white"> Moderator</span>
          </div>
        </nav>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Teachers</h2>

          {teachers?.length === 0 ? (
            <p className="text-center text-muted-foreground">No teachers available</p>
          ) : (
            <div className="grid gap-4">
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-white shadow p-4 rounded-lg mb-3 flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-md font-semibold">{teacher.full_name}</h4>
                    <p className="text-sm text-gray-500">Subject: {teacher.subject || "N/A"}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <details className="relative">
                      <summary className="cursor-pointer px-2">⋯</summary>
                      <div className="absolute bg-white shadow p-2 rounded right-0 top-6 text-sm">
                        <p><strong>Email:</strong> {teacher.email}</p>
                        <p><strong>Joined:</strong> {teacher.created_at}</p>
                      </div>
                    </details>

                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      🗑
                    </button>
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