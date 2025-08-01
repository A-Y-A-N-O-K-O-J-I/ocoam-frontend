import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import ModeratorNavBar from "../components/ModeratorNavbar";
import axios from "axios";

export default function StudentsList() {
  const baseURL = import.meta.env.VITE_API_URL;

  const [students, setStudents] = useState([]);
  const [openCard, setOpenCard] = useState(null);

  const handleToggleDetails = (id) => {
    setOpenCard(openCard === id ? null : id);
  };

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get(`${baseURL}/moderator/students`, {
          withCredentials: true,
        });
        setStudents(response.data.students || []);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    }

    fetchStudents();
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
          <h2 className="text-xl font-semibold mb-4 text-center">Students</h2>

          {students?.length === 0 ? (
            <p className="text-center text-muted-foreground">No students available</p>
          ) : (
            <div className="grid gap-4">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="bg-white shadow p-4 rounded-lg mb-3 flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-md font-semibold">{student.full_name}</h4>
                    <p className="text-sm text-gray-500">Level: {student.education_level}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <details className="relative">
                      <summary className="cursor-pointer px-2">⋯</summary>
                      <div className="absolute bg-white shadow p-2 rounded right-0 top-6 text-sm">
                        <p><strong>Email:</strong> {student.email}</p>
                        <p><strong>Joined:</strong> {student.created_at}</p>
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
