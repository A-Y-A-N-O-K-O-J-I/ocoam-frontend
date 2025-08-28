import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CgProfile } from "react-icons/cg";
import QuickAccessCard from "./QuickAccessCard";

export default function QuickAccessSection() {
  const quickAccessItems = [
    {
      title: "Create Class",
      icon: "🎥",
      image: "/video-call.jpg",
      imageAlt: "Video Calling Image",
      buttonText: "Create Class",
      gradient: "from-green-100 to-emerald-100",
      borderColor: "border-green-200",
      textColor: "text-green-600",
      buttonGradient: "from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
      hoverGradient: "from-green-400/20 to-emerald-500/20",
      delay: 0
    },
    {
      title: "See Teacher Size",
      icon: "👨‍🏫",
      image: "/teacher.jpg",
      imageAlt: "Animated teacher teaching",
      buttonText: "Get Teacher List",
      gradient: "from-emerald-100 to-green-100",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-600",
      buttonGradient: "from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
      hoverGradient: "from-emerald-400/20 to-green-500/20",
      delay: 150
    },
    {
      title: "Profile Info",
      icon: <CgProfile size={24} className="text-green-600" />,
      customContent: (
        <div className="h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center">
          <CgProfile className="h-8 w-8 sm:h-12 sm:w-12 text-green-400 rounded-full border-4 border-green-200 p-1 transform group-hover:scale-110 transition-transform duration-300" />
        </div>
      ),
      buttonText: "Get Info",
      gradient: "from-green-100 to-emerald-100",
      borderColor: "border-green-200",
      textColor: "text-green-600",
      buttonGradient: "from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
      hoverGradient: "from-green-400/20 to-emerald-500/20",
      delay: 300
    }
  ];

  return (
    <div className="mb-6 sm:mb-8 animate-fade-in-up">
      {/* Section Header */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center space-x-3 sm:space-x-4 px-4 sm:px-6 py-2 sm:py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></span>
          <p className="text-sm sm:text-lg font-bold text-green-800 tracking-wide">QUICK ACCESS</p>
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></span>
        </div>
      </div>
      
      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {quickAccessItems.map((item, index) => (
          <QuickAccessCard
            key={index}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}