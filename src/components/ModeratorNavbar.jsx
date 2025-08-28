import { useState } from "react";
import {
  House,
  Menu,
  Video,
  Users,
  User,
  UserCircle,
  LogOutIcon,
  GraduationCap,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function ModeratorNavBar() {
  const menuItems = [
    { icons: <House size={20} />, labels: "Home", color: "text-green-400" },
    { icons: <Video size={20} />, labels: "Classes", color: "text-emerald-400" },
    { icons: <Users size={20} />, labels: "Students", color: "text-green-300" },
    { icons: <User size={20} />, labels: "Teachers", color: "text-emerald-300" },
    { icons: <UserCircle size={20} />, labels: "Profile", color: "text-green-400" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  // Get current active route
  const getCurrentRoute = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes('dashboard')) return 'home';
    if (path.includes('classes')) return 'classes';
    if (path.includes('students')) return 'students';
    if (path.includes('teachers')) return 'teachers';
    if (path.includes('profile')) return 'profile';
    return 'home';
  };

  const activeRoute = getCurrentRoute();

  return (
    <nav
      className={`h-screen flex flex-col p-3 bg-gradient-to-b from-green-800 via-green-900 to-emerald-900 shadow-2xl transition-all duration-500 ease-in-out relative ${
        isOpen ? "w-56" : "w-20"
      }`}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-400/20 via-transparent to-emerald-400/20"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-300/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-emerald-300/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Enhanced Header */}
      <div
        className={`relative z-10 border-2 border-green-400/30 bg-green-700/50 backdrop-blur-sm flex justify-between items-center gap-2 px-4 py-3 ${
          isOpen ? "rounded-xl" : "rounded-full"
        } shadow-lg hover:shadow-green-400/20 transition-all duration-500 ease-in-out cursor-pointer group`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Logo with smooth transition */}
        <div className={`flex items-center space-x-2 transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0 w-0"
        }`}>
          <img
            src="/logo.png"
            className="w-8 h-8 rounded-full border-2 border-green-300 shadow-md"
            alt="Logo"
          />
          <div className="text-white">
            <h1 className="text-sm font-bold tracking-wider">O.C.O.Y.A.M</h1>
            <p className="text-xs text-green-200 -mt-1">Moderator</p>
          </div>
        </div>

        {/* Menu Toggle with rotation animation */}
        <div className="text-white group-hover:text-green-300 transition-colors duration-300">
          {isOpen ? (
            <X size={20} className="transform rotate-180 transition-transform duration-300" />
          ) : (
            <Menu size={20} className="transform group-hover:scale-110 transition-transform duration-300" />
          )}
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-green-400/0 group-hover:bg-green-400/10 rounded-xl transition-all duration-300"></div>
      </div>

      {/* Enhanced Menu Body */}
      <ul className="flex-1 mt-6 space-y-2 relative z-10">
        {menuItems.map((item, index) => {
          const isActive = activeRoute === item.labels.toLowerCase();
          
          return (
            <Link
              key={index}
              to={`/moderator/${item.labels.toLowerCase() === "home" ? "dashboard" : item.labels.toLowerCase()}`}
            >
              <li
                className={`relative py-3 px-4 my-2 rounded-xl cursor-pointer transition-all duration-300 ease-in-out group overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg shadow-green-500/30 scale-105"
                    : "hover:bg-green-700/50 hover:scale-102"
                }`}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Background glow effect */}
                <div className={`absolute inset-0 transition-all duration-300 ${
                  isActive 
                    ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20" 
                    : hoveredItem === index 
                      ? "bg-green-400/10" 
                      : "bg-transparent"
                } rounded-xl`}></div>

                {/* Content */}
                <div className="relative z-10 flex items-center gap-3">
                  {/* Icon with enhanced styling */}
                  <div className={`transition-all duration-300 ${
                    isActive 
                      ? "text-white transform scale-110" 
                      : `text-green-200 group-hover:text-white group-hover:scale-110 ${item.color}`
                  }`}>
                    {item.icons}
                  </div>

                  {/* Label with smooth animation */}
                  <p className={`font-medium transition-all duration-300 origin-left whitespace-nowrap ${
                    isOpen ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-0 -translate-x-4"
                  } ${
                    isActive 
                      ? "text-white font-semibold" 
                      : "text-green-200 group-hover:text-white"
                  }`}>
                    {item.labels}
                  </p>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>

                {/* Hover line effect */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-emerald-400 transition-all duration-300 ${
                  hoveredItem === index || isActive ? "opacity-100" : "opacity-0"
                } rounded-r-full`}></div>

                {/* Ripple effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out"></div>
              </li>
            </Link>
          );
        })}
      </ul>

      {/* Enhanced Footer - Logout */}
      <Link to="/logout">
        <div className="relative z-10 px-4 py-3 mt-4 text-sm flex items-center gap-3 hover:bg-red-600/20 rounded-xl transition-all duration-300 cursor-pointer group border border-red-400/20 hover:border-red-400/40">
          {/* Background glow */}
          <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 rounded-xl transition-all duration-300"></div>
          
          {/* Icon */}
          <div className="text-red-300 group-hover:text-red-200 transition-all duration-300 group-hover:scale-110 relative z-10">
            <LogOutIcon size={20} />
          </div>

          {/* Label */}
          <span className={`font-medium text-red-300 group-hover:text-red-200 transition-all duration-300 origin-left whitespace-nowrap relative z-10 ${
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}>
            Logout
          </span>

          {/* Warning indicator */}
          <div className={`ml-auto transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
            <div className="w-1 h-1 bg-red-400 rounded-full group-hover:animate-ping"></div>
          </div>
        </div>
      </Link>

      {/* Bottom branding */}
      <div className="relative z-10 mt-4 text-center">
        <div className={`transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center justify-center space-x-1 text-green-300 text-xs">
            <GraduationCap size={14} />
            <span>Traditional Medicine</span>
          </div>
          <div className="text-green-400 text-xs mt-1 font-semibold">Portal</div>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in {
          animation: slideInLeft 0.4s ease-out forwards;
        }
      `}</style>
    </nav>
  );
}

export default ModeratorNavBar;