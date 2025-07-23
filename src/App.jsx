import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './util-pages/Login';
import Logout from './util-pages/Logout';
import Signup from './util-pages/Signup';
import VerifyEmail from './util-pages/VerifyEmail';
import AuthOnlyRoute from './auth/authOnly';
import EmailVerified from './util-pages/EmailVerified';
import ForgotPassword from './util-pages/ForgotPassword';
import ResetPassword from './util-pages/ResetPassword';
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
      </Routes>
    </Router>
  );
}

export default App;