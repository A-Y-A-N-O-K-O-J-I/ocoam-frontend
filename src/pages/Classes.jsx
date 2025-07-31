import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import ModeratorNavBar from "../components/ModeratorNavbar";


const sampleClasses = [
  {
    id: "cls_001",
    title: "Mathematics - Algebra I",
    accessCode: "MATH1234",
    scheduled: true,
    time: "2025-08-01T14:00",
  },
  {
    id: "cls_002",
    title: "Biology - Cell Structure",
    accessCode: "BIO5678",
    scheduled: false,
    time: "2025-08-03T10:00",
  },
  {
    id: "cls_003",
    title: "English - Essay Writing",
    accessCode: "ENG9101",
    scheduled: true,
    time: "2025-08-02T08:30",
  },
];

export default function ClassesList({ classes = sampleClasses }) {
  const [openCard, setOpenCard] = useState(null);

  const handleToggleDetails = (id) => {
    setOpenCard(openCard === id ? null : id);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <ModeratorNavBar />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
         <nav className="w-full bg-blue-500 sticky top-0 z-50 h-10 overflow-hidden transition-all duration-500 ease-in-out">
          <div className="flex justify-center py-2 space-x-5 items-center">
            <p className="md:font-extrabold font-bold text-white"> O.C.O.Y.A.M</p>
            <span className="md:font-extrabold font-bold text-white"> Moderator</span>
          </div>
        </nav>
        {/* Header */}
        <div className="p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Classes</h2>
          <Button>Create Class</Button>
        </div>

        {/* Content */}
        {classes?.length === 0 || !classes ? (
            <p className="text-center text-muted-foreground">
            No classes available
          </p>
        ) : (
            <div className="grid gap-4">
            {
                classes.map((cls) => (
                    <div key={cls.id} className="bg-white shadow p-4 rounded-lg mb-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{cls.title}</h3>
        <p className="text-sm text-gray-500">{cls.subject}</p>
      </div>

      <div className="flex items-center gap-2">
        {/* Start Button */}
        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
          ▶ Start
        </button>

        {/* 3 dots for info */}
        <details className="relative">
          <summary className="cursor-pointer px-2">⋯</summary>
          <div className="absolute bg-white shadow p-2  rounded opacity-1 right-0 top-6 text-sm">
            <p><strong>Access Code:</strong> {cls.accessCode}</p>
            <p><strong>ID:</strong> {cls.id}</p>
            <p><strong>Scheduled:</strong> {cls.scheduled ? "Yes" : "No"}</p>
            <p><strong>Time:</strong> {new Date(cls.time).toLocaleString()}</p>
          </div>
        </details>

        {/* Delete */}
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
