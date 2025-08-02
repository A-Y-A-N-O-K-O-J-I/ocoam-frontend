import React, { useState, useEffect } from 'react';
import { Camera, Users, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomeSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { icon: Camera, text: "Capture Moments" },
    { icon: Users, text: "Connect Locally" },
    { icon: Zap, text: "Share Instantly" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full opacity-10 animate-ping delay-500"></div>
      </div>

      <div className={`relative z-10 text-center max-w-2xl mx-auto transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        
        {/* Logo/Brand */}
        <div className="mb-8 relative">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-6 transform hover:scale-110 transition-transform duration-300 shadow-2xl">
            <Camera size={40} className="text-white animate-bounce" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              Oyocam
            </span>
          </h1>
        </div>

        {/* Welcome message */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl text-gray-200 mb-6 font-light">
            Welcome to the Future of
            <span className="block text-4xl md:text-5xl font-bold text-white mt-2">
              Yoruba Culture
            </span>
          </h2>
          
          {/* Rotating features */}
          <div className="h-16 flex items-center justify-center">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center space-x-3 absolute transition-all duration-500 ${
                    currentFeature === index 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform translate-y-4'
                  }`}
                >
                  <Icon size={24} className="text-purple-400" />
                  <span className="text-xl text-gray-300 font-medium">{feature.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center">
          <button className="group w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center space-x-2">
            <span className="text-lg"> <Link to = "/signup"> Get Started </Link></span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="group w-full md:w-auto bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <span className="text-lg">Sign In</span>
          </button>
        </div>

        {/* Quick signup prompt */}
        <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <p className="text-gray-300 mb-4">
            🚀 <strong>Join thousands</strong> of photographers in Oyo State
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email for early access"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
            />
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap">
              Join Waitlist
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            * Be the first to capture and share Ibadan's moments
          </p>
        </div>

        {/* Social proof */}
        <div className="mt-8 flex justify-center items-center space-x-6 text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white/20"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white/20"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full border-2 border-white/20"></div>
            </div>
            <span className="text-sm">500+ Early Adopters</span>
          </div>
          <div className="text-yellow-400">★★★★★</div>
        </div>
      </div>
    </div>
  );
}