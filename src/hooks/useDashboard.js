import { useState } from "react";
import axios from "axios";

export function useDashboard(baseURL) {
  const [dashboardStats, setDashboardStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${baseURL}/moderator/dashboard`, {
        withCredentials: true,
      });

      const data = response.data;
      setDashboardStats({
        students: data[0].total_students,
        teachers: data[1].total_teachers,
        classes: data[2].total_classes,
      });
      setIsLoaded(true);
    } catch (error) {
      console.error("Failed to fetch dashboard info", error);
      setIsLoaded(true);
    }
  };

  return {
    dashboardStats,
    isLoaded,
    fetchDashboardData
  };
}