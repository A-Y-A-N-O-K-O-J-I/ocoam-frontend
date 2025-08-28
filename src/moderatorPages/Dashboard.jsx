import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModeratorNavbar from "../components/ModeratorNavbar";
import axios from "axios";

// Import modular components
import WelcomeSection from "../components/WelcomeSection";
import StatsCards from "../components/StatsCards";
import QuickAccessSection from "../components/QuickAccessSection";
import PageHeader from "../components/PageHeader";
import MobileNavigation from "../components/MobileNavigation";
import { useDashboard } from "../hooks/useDashboard";

export default function ModeratorDashboard() {
  const baseURL = import.meta.env.VITE_API_URL;
  
  // Custom hook for dashboard data
  const { dashboardStats, isLoaded, fetchDashboardData } = useDashboard(baseURL);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      {/* Mobile Navigation */}
      <MobileNavigation />

      {/* Desktop Sidebar - Fixed position, hidden on mobile */}
      

      {/* Main content - with left margin to account for fixed sidebar */}
      
        {/* Header - Fixed at top with proper z-index */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-green-200">
          <PageHeader />
        </div>

        {/* Content area */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Welcome Section */}
          <WelcomeSection />

          {/* Stats Cards */}
          <StatsCards stats={dashboardStats} isLoaded={isLoaded} />

          {/* Quick Access Section */}
          <QuickAccessSection />

          {/* Footer */}
          <div className="text-center py-6 sm:py-8 mt-8 sm:mt-12">
            <div className="inline-flex items-center space-x-2 text-green-600">
              <span className="text-lg sm:text-xl animate-bounce">🌿</span>
              <p className="text-xs sm:text-sm font-medium">
                Preserving Traditional Yoruba Medicine Heritage
              </p>
              <span 
                className="text-lg sm:text-xl animate-bounce"
                style={{animationDelay: '0.5s'}}
              >
                🌿
              </span>
            </div>
          </div>
        </div>
    </div>
  );
}