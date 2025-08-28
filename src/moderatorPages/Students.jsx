import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import ModeratorNavBar from "../components/ModeratorNavbar";
import axios from "axios";
import MobileNavigation from "../components/MobileNavigation";
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
    <div className="flex h-screen w-full">
      
            {/* Desktop Sidebar - Hidden on mobile, shown on larger screens */}
      {/* Main Content Area - Only this scrolls */}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Fixed Header - Won't scroll */}
        <nav className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 sticky top-0 z-50 h-16 shadow-lg shadow-green-200/50 flex-shrink-0">
          <MobileNavigation />
          <div className="flex justify-center py-4 space-x-6 items-center relative">
            <div className="absolute inset-0 bg-green-400/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center space-x-6">
              <h1 className="text-xl md:text-2xl font-black text-white tracking-wider drop-shadow-lg">
                O.C.O.Y.A.M
              </h1>
              <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white font-bold text-sm">
                Moderator
              </span>
            </div>
          </div>
        </nav>
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-green-50 to-emerald-100 p-6">
          {/* Enhanced Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-6 text-white shadow-2xl shadow-green-300/30 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Students Management 👨‍🎓</h2>
                  <p className="text-green-100">Manage all registered students in the traditional medicine program</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-3xl">📚</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Students List */}
          {students?.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <div className="text-6xl mb-4">🎓</div>
                <p className="text-xl font-semibold text-gray-600 mb-2">No Students Found</p>
                <p className="text-gray-500">Students will appear here once they register</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Students Count */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-green-800">Total Students: {students.length}</h3>
                  <div className="flex items-center space-x-2 text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-medium">Active</span>
                  </div>
                </div>
              </div>
              
              {/* Students Grid */}
              <div className="grid gap-6">
                {students.map((student, index) => (
                  <div
                    key={student.id}
                    className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-green-200/50 p-6 rounded-2xl border border-green-100 transform hover:scale-[1.02] transition-all duration-300 group"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'slideInUp 0.6s ease-out forwards'
                    }}
                  >
                    <div className="flex justify-between items-start">
                      {/* Student Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          {/* Avatar */}
                          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {student.full_name?.charAt(0)?.toUpperCase() || 'S'}
                          </div>
                          
                          {/* Name and Level */}
                          <div>
                            <h4 className="text-lg font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                              {student.full_name}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                Level: {student.education_level}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Additional Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                            <span><strong>Email:</strong> {student.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                            <span><strong>Joined:</strong> {new Date(student.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-3">
                        {/* More Details */}
                        <details className="relative">
                          <summary className="cursor-pointer p-2 hover:bg-green-100 rounded-full transition-colors duration-300 list-none">
                            <MoreHorizontal size={20} className="text-green-600" />
                          </summary>
                          <div className="absolute bg-white shadow-2xl border border-green-100 p-4 rounded-xl right-0 top-10 text-sm min-w-64 z-10">
                            <div className="space-y-3">
                              <div className="border-b border-gray-100 pb-2">
                                <h5 className="font-semibold text-green-700 mb-2">Student Details</h5>
                              </div>
                              <div><strong>Full Name:</strong> {student.full_name}</div>
                              <div><strong>Email:</strong> {student.email}</div>
                              <div><strong>Education Level:</strong> {student.education_level}</div>
                              <div><strong>Registration Date:</strong> {new Date(student.created_at).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}</div>
                              <div className="pt-2 border-t border-gray-100">
                                <div className="flex items-center space-x-2">
                                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                  <span className="text-green-600 font-medium">Active Student</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </details>
                        
                        {/* Delete Button */}
                        <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group">
                          <span className="text-lg">🗑️</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Footer */}
          <div className="text-center py-8 mt-12">
            <div className="inline-flex items-center space-x-2 text-green-600">
              <span className="text-xl animate-bounce">🌿</span>
              <p className="text-sm font-medium">Empowering Students in Traditional Yoruba Medicine</p>
              <span className="text-xl animate-bounce" style={{animationDelay: '0.5s'}}>🌿</span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}