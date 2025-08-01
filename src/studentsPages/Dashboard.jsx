import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { FaUsers, FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import CountUp from "react-countup";
import StudentNavBar from "../components/studentsNavbar";

export default function StudentDashboard() {
  const baseURL = import.meta.env.VITE_API_URL;

  const [dashboardStats, setDashboardStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
  });

  useEffect(() => {
    async function getDashboardInfo() {
      try {
        const response = await axios.get(`${baseURL}/students/dashboard`, {
          withCredentials: true,
        });

        const data = response.data;
        setDashboardStats({
          students: data.data.totalClasses,
          teachers: data.data.scheduledClasses,
          classes: data.data.liveClasses,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard info", err);
      }
    }

    getDashboardInfo();
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <StudentNavBar />
      <div className="flex-1 bg-gray-50 overflow-auto transition-all duration-500 ease-in-out">
        <nav className="w-full bg-blue-500 sticky top-0 z-50 h-10 overflow-hidden transition-all duration-500 ease-in-out">
          <div className="flex justify-center py-2 space-x-5 items-center">
            <p className="md:font-extrabold font-bold text-white">O.C.O.Y.A.M</p>
            <span className="md:font-extrabold font-bold text-white">Students</span>
          </div>
        </nav>

        <div className="flex flex-col justify-center m-5 gap-6 animate-fade-in-up">
          {["Classes", "Scheduled Classes", "Live Classes"].map((title, i) => {
            const icons = [
              <FaUsers size={20} />,
              <FaChalkboardTeacher size={20} />,
              <MdOutlineOndemandVideo size={20} />,
            ];
            const colors = ["blue-100", "purple-600/50", "green-100"];
            const links = ["classes", "classes", "classes"];
            const count =
              i === 0
                ? dashboardStats.students
                : i === 1
                ? dashboardStats.teachers
                : dashboardStats.classes;

            return (
              <Card
                key={i}
                className="transform transition duration-500 hover:scale-105 hover:shadow-xl"
              >
                <CardHeader>
                  <p className="text-sm text-gray-500">Total {title}</p>
                </CardHeader>

                <CardContent>
                  <CountUp end={count} duration={2} className="text-3xl font-bold" />
                  <CardAction>
                    <div
                      className={`w-14 h-14 rounded-full bg-${colors[i]} flex items-center justify-center`}
                    >
                      {icons[i]}
                    </div>
                  </CardAction>
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                    <Link
                      to={`/${links[i]}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      View all {title.toLowerCase()}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <div className="flex flex-col justify-center items-center whitespace-nowrap">
            <p className="text-blue-300 pb-6 md:font-extrabold font-bold">
              - QUICK ACCESS -
            </p>
            <div className="flex md:flex-row flex-col md:px-4 gap-6 w-full justify-between animate-fade-in">
              <Card className="px-5 py-8 items-center bg-green-100 transform transition duration-500 hover:scale-105">
                <p className="text-center text-lg text-green-600">Join Class</p>
                <img
                  src="/video-call.jpg"
                  alt="Video Calling Image"
                  className="h-30 w-30 rounded-full border-4 border-green-200"
                />
                <Button>Join Class</Button>
              </Card>
              <Card className="px-5 py-8 items-center bg-purple-100 text-purple-600 text-lg transform transition duration-500 hover:scale-105">
                <p className="text-center"> Become Moderator </p>
                <img
                  src="/teacher.jpg"
                  alt="Animated teacher teaching"
                  className="h-30 w-30 rounded-full border-4 border-purple-200"
                />
                <Button className="bg-purple-400 hover:bg-purple-500 text-white">
                  <Link to = "/moderator">Become Moderator </Link>
                </Button>
              </Card>
              <Card className="px-5 py-8 items-center transform transition duration-500 hover:scale-105">
                <p className="text-center">Profile Info</p>
                <CgProfile className="h-30 w-30 text-yellow-400 rounded-full border-4 border-yellow-200" />
                <Button className="text-black bg-yellow-200/30 hover:bg-yellow-100/50">
                  Get Info
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
