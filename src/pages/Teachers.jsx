import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import ModeratorNavBar from "../components/ModeratorNavbar";

export default function TeachersList({ teachers }) {
  const [openCard, setOpenCard] = useState(null);

  const handleToggleDetails = (id) => {
    setOpenCard(openCard === id ? null : id);
  };

const dummyTeachers = [
  {
    id: "teach1",
    name: "Mr. Adewale",
    email: "adewale@school.edu",
    subject: "Physics",
    joinedAt: "2024-05-12"
  },
  {
    id: "teach2",
    name: "Mrs. Okoro",
    email: "okoro@school.edu",
    subject: "English",
    joinedAt: "2023-09-20"
  },
  {
    id: "teach3",
    name: "Miss Amina Bello",
    email: "amina@school.edu",
    subject: "Mathematics",
    joinedAt: "2025-01-15"
  }
];


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
            {
                dummyTeachers.map((teacher) => (
                    <div key={teacher.id} className="bg-white shadow p-4 rounded-lg mb-3 flex justify-between items-center">
      <div>
        <h4 className="text-md font-semibold">{teacher.name}</h4>
        <p className="text-sm text-gray-500">{teacher.subject}</p>
      </div>

      <div className="flex items-center gap-2">
        <details className="relative">
          <summary className="cursor-pointer px-2">⋯</summary>
          <div className="absolute bg-white shadow p-2 rounded right-0 top-6 text-sm">
            <p><strong>Email:</strong> {teacher.email}</p>
            <p><strong>Joined:</strong> {teacher.joinedAt}</p>
          </div>
        </details>

        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          🗑
        </button>
      </div>
    </div>
  ))
}

          </div>
        )}
      </div>
        </div>
    </div>
  );
}
