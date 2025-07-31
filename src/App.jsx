import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './util-pages/Login';
import Logout from './util-pages/Logout';
import Signup from './util-pages/Signup';
import VerifyEmail from './util-pages/VerifyEmail';
import AuthOnlyRoute from './auth/authOnly';
import EmailVerified from './util-pages/EmailVerified';
import ForgotPassword from './util-pages/ForgotPassword';
import ResetPassword from './util-pages/ResetPassword';
import LiveClass from './pages/LiveClasses';
import TestApp from './Test';
import HomeSection from './pages/Home';
import ModeratorDashboard from './pages/Dashboard';
import ProtectedRoute from './auth/protectedRoute';
import ClassesList from './pages/Classes';
import StudentsList from './pages/Students';
import TeachersList from './pages/Teachers';
import ProfileSection from './pages/Profile';
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
<Route path = "/logout" element = {<Logout />} />

<Route path='/dashboard' element = {
  <ProtectedRoute>
    <ModeratorDashboard />
  </ProtectedRoute>
  }/>
<Route path='/test' element = {< TestApp />} />
<Route path='/classes' element = {< ClassesList />} />
<Route path='/students' element = {< StudentsList />} />
<Route path='/profile' element = {< ProfileSection />} />
<Route path='/teachers' element = {< TeachersList />} />
<Route path = "/" element = {<HomeSection /> } />
<Route path = "/classroom/:classId" element = {<LiveClass />}/>
      </Routes>
    </Router>
  );
}

export default App;