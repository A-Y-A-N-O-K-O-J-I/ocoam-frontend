import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaUsers, FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import CountUp from "react-countup";

export default function StatsCards({ stats, isLoaded }) {
  const cardData = [
    {
      title: "Students",
      count: stats.students,
      icon: <FaUsers size={20} className="text-green-600" />,
      bgColor: "bg-green-100",
      borderColor: "border-green-200",
      gradient: "from-green-400 to-emerald-500",
      link: "/students",
      delay: 0
    },
    {
      title: "Teachers", 
      count: stats.teachers,
      icon: <FaChalkboardTeacher size={20} className="text-emerald-600" />,
      bgColor: "bg-emerald-100",
      borderColor: "border-emerald-200", 
      gradient: "from-emerald-500 to-green-600",
      link: "/teachers",
      delay: 150
    },
    {
      title: "Scheduled Classes",
      count: stats.classes,
      icon: <MdOutlineOndemandVideo size={20} className="text-green-700" />,
      bgColor: "bg-green-100",
      borderColor: "border-green-200",
      gradient: "from-green-500 to-emerald-600", 
      link: "/classes",
      delay: 300
    }
  ];

  return (
    <div className="mb-6 sm:mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {cardData.map((card, index) => (
          <Card
            key={index}
            className={`${card.bgColor} ${card.borderColor} border-2 transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-200/50 group overflow-hidden relative animate-slide-up`}
            style={{
              animationDelay: `${card.delay}ms`
            }}
          >
            {/* Animated background gradient on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
            
            <CardHeader className="relative z-10 pb-2 sm:pb-4">
              <div className="flex justify-between items-center">
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Total {card.title}</p>
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-white shadow-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  {card.icon}
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 pt-0">
              <div className="mb-3 sm:mb-4">
                {isLoaded ? (
                  <CountUp 
                    end={card.count} 
                    duration={2.5} 
                    className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800" 
                  />
                ) : (
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-400 animate-pulse">
                    --
                  </div>
                )}
              </div>
              
              <div className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-white/50 backdrop-blur-sm border-t border-gray-100 rounded-b-lg -mx-6 -mb-6 mt-2 sm:mt-4">
                <Link
                  to={card.link}
                  className="inline-flex items-center text-xs sm:text-sm font-semibold text-green-700 hover:text-emerald-800 group-hover:translate-x-1 transition-all duration-300"
                >
                  View all {card.title.toLowerCase()}
                  <span className="ml-1 sm:ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}