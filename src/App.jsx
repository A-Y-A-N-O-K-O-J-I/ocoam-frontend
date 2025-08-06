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
import FullPageWebsite from "./pages/FullPage";
import ModeratorDashboard from "./moderatorPages/Dashboard";
import ProtectedRoute from "./auth/protectedRoute";
import ClassesList from "./moderatorPages/Classes";
import StudentsList from "./moderatorPages/Students";
import TeachersList from "./moderatorPages/Teachers";
import ProfileSection from "./moderatorPages/Profile";
import StudentDashboard from "./studentsPages/Dashboard";
import ProtectedModeratorRoute from "./auth/protectedModeratorRoute";
import StudentClassesList from "./studentsPages/Classes";
import BecomeModerator from "./studentsPages/BecomeModerator";
import StudentProfileSection from "./studentsPages/Profile";
import NotFoundPage from "./util-pages/NotFound";
import { TermsOfService, PrivacyPolicy,CopyrightDisclaimer } from "./util-pages/Terms";
// In your main App.jsx or router file
import VideoCall from './components/VideoCall';

// Add this route
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
          <Route path="/class/:accessCode" element={<VideoCall />} />

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
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <StudentProfileSection />
            </ProtectedRoute>
          }
        />
        <Route path="/test" element={<TestApp />} />
        <Route path="/moderator" element={<BecomeModerator />} />
        <Route
          path="/moderator/classes"
          element={
            <ProtectedModeratorRoute>
              {" "}
              <ClassesList />{" "}
            </ProtectedModeratorRoute>
          }
        />
        <Route
          path="/moderator/students"
          element={
            <ProtectedModeratorRoute>
              <StudentsList />{" "}
            </ProtectedModeratorRoute>
          }
        />
        <Route
          path="/moderator/profile"
          element={
            <ProtectedModeratorRoute>
              <ProfileSection />
            </ProtectedModeratorRoute>
          }
        />
        <Route
          path="/moderator/teachers"
          element={
            <ProtectedModeratorRoute>
              <TeachersList />
            </ProtectedModeratorRoute>
          }
        />
        <Route path="/" element={<FullPageWebsite />} />
        <Route path="/classroom/:classId" element={

          <LiveClass />

          } />
          <Route path="/terms-of-service" element = { <TermsOfService /> } />
          <Route path="/privacy-policy" element = { <PrivacyPolicy /> } />
          <Route path="/copyright" element = { <CopyrightDisclaimer /> } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
