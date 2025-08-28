import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuickAccessCard({
  title,
  icon,
  image,
  imageAlt,
  customContent,
  buttonText,
  gradient,
  borderColor,
  textColor,
  buttonGradient,
  hoverGradient,
  delay
}) {
  return (
    <Card 
      className={`p-4 sm:p-6 lg:p-8 items-center group relative overflow-hidden bg-gradient-to-br ${gradient} border-2 ${borderColor} transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-300/50 animate-slide-up`}
      style={{animationDelay: `${delay}ms`}}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      <div className="relative z-10 flex flex-col items-center space-y-3 sm:space-y-4">
        {/* Icon */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full shadow-lg flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300">
          {typeof icon === 'string' ? (
            <span className="text-lg sm:text-2xl">{icon}</span>
          ) : (
            icon
          )}
        </div>

        {/* Title */}
        <p className={`text-center text-sm sm:text-lg ${textColor} font-bold`}>
          {title}
        </p>

        {/* Image or Custom Content */}
        {image ? (
          <img
            src={image}
            alt={imageAlt}
            className="h-20 w-20 sm:h-24 sm:w-24 lg:h-30 lg:w-30 rounded-full border-4 border-green-200 transform group-hover:scale-110 transition-transform duration-300 object-cover"
          />
        ) : customContent ? (
          customContent
        ) : null}

        {/* Button */}
        <Button className={`bg-gradient-to-r ${buttonGradient} text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base`}>
          {buttonText}
        </Button>
      </div>
    </Card>
  );
}