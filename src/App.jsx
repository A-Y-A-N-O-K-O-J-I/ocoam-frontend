import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./util-pages/Login";
import Logout from "./util-pages/Logout";
import Signup from "./util-pages/Signup";
import VerifyEmail from "./util-pages/VerifyEmail";
import AuthOnlyRoute from "./auth/authOnly";
import EmailVerified from "./util-pages/EmailVerified";
import ForgotPassword from "./util-pages/ForgotPassword";
import ResetPassword from "./util-pages/ResetPassword";
import LiveClass from "./moderatorPages/LiveClasses";
import TestApp from "./Test";
import HomeSection from "./moderatorPages/Home";
import ModeratorDashboard from "./moderatorPages/Dashboard";
import ProtectedRoute from "./auth/protectedRoute";
import ClassesList from "./moderatorPages/Classes";
import StudentsList from "./moderatorPages/Students";
import TeachersList from "./moderatorPages/Teachers";
import ProfileSection from "./moderatorPages/Profile";
import StudentDashboard from "./studentsPages/Dashboard";
import ProtectedModeratorRoute from "./auth/protectedModeratorRoute";
import StudentClassesList from "./studentsPages/Classes";
import StudentProfileSection from "./studentsPages/Profile";
function App() {
  return (
    <Router>
      <Routes>
        {/* 🔐 Guest-only: Login Page */}
        <Route
          path="/login"
          element={
            <AuthOnlyRoute>
              <Login />
            </AuthOnlyRoute>
          }
        />

        {/* 🔐 Guest-only: Signup Page */}
        <Route
          path="/signup"
          element={
            <AuthOnlyRoute>
              <Signup />
            </AuthOnlyRoute>
          }
        />

        {/* 🔐 Guest-only: Verify Email Page (Step before link click) */}
        <Route
          path="/verify-email"
          element={
            <AuthOnlyRoute>
              <VerifyEmail />
            </AuthOnlyRoute>
          }
        />

        {/* 🔐 Guest-only: Email Verified Success Page */}
        <Route
          path="/auth/verify-email"
          element={
            <AuthOnlyRoute>
              <EmailVerified />
            </AuthOnlyRoute>
          }
        />

        {/* 🔐 Guest-only: Forgot Password Page */}
        <Route
          path="/forgot-password"
          element={
            <AuthOnlyRoute>
              <ForgotPassword />
            </AuthOnlyRoute>
          }
        />

        {/* 🔐 Guest-only: Reset Password Page */}
        <Route
          path="/update-password"
          element={
            <AuthOnlyRoute>
              <ResetPassword />
            </AuthOnlyRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />

        <Route
          path="/moderator/dashboard"
          element={
            <ProtectedModeratorRoute>
              <ModeratorDashboard />
            </ProtectedModeratorRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <StudentClassesList />
            </ProtectedRoute>
          }
        />
        <Route path="/moderator/test" element={<TestApp />} />
        <Route path="/moderator/classes" element={<ClassesList />} />
        <Route path="/moderator/students" element={<StudentsList />} />
        <Route path="/moderator/profile" element={<ProfileSection />} />
        <Route path="/moderator/teachers" element={<TeachersList />} />
        <Route path="/" element={<HomeSection />} />
        <Route path="/classroom/:classId" element={<LiveClass />} />
      </Routes>
    </Router>
  );
}

export default App;
