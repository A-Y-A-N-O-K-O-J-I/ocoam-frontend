import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

const AuthSystem = () => {
  const [currentView, setCurrentView] = useState('login');
  const [userType, setUserType] = useState('user');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  // Field errors
  const [fieldErrors, setFieldErrors] = useState({});

  const API_URL = import.meta.env.VITE_API_URL;

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    adminkey: '', // for super admin
    mainPhone: '', // for user
    assistantPhone: '', // for user
    adminCode: '' // for user
  });

  // Get user types based on current view
  const getUserTypes = () => {
    if (currentView === 'signup') {
      return ['user', 'superadmin'];
    }
    return ['user', 'admin', 'superadmin'];
  };

  function removePlus(number){
    const formattedPhone = number.split("+")[1]
    return formattedPhone;
    
  }
  // Validate phone number using libphonenumber-js
  const validatePhone = (phone) => {
    if (!phone) return { isValid: false, error: 'Phone number is required' };
    
    try {
      const phoneNumber = parsePhoneNumber(phone);
      if (!phoneNumber || !isValidPhoneNumber(phone)) {
        return { isValid: false, error: 'Invalid phone number format' };
      }
      return { isValid: true, formatted: phoneNumber.formatInternational() };
    } catch (error) {
      return { isValid: false, error: 'Invalid phone number format' };
    }
  };

  // Validate form fields
  const validateForm = (isSignup) => {
    const errors = {};
    
    if (isSignup) {
      // Name validation
      if (!signupForm.name.trim()) {
        errors.name = 'Full name is required';
      }
      
      // Email validation
      if (!signupForm.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(signupForm.email)) {
        errors.email = 'Please enter a valid email address';
      }
      
      // Password validation
      if (!signupForm.password) {
        errors.password = 'Password is required';
      } else if (signupForm.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      
      // User type specific validation
      if (userType === 'superadmin') {
        if (!signupForm.adminkey) {
          errors.adminkey = 'Admin key is required';
        }
      } else if (userType === 'user') {
        if (!signupForm.adminCode) {
          errors.adminCode = 'Admin code is required';
        }
        
        // Phone validation
        if (!signupForm.mainPhone) {
          errors.mainPhone = 'Main phone number is required';
        } else {
          const phoneValidation = validatePhone(signupForm.mainPhone);
          if (!phoneValidation.isValid) {
            errors.mainPhone = phoneValidation.error;
          }
        }
        
        if (!signupForm.assistantPhone) {
          errors.assistantPhone = 'Assistant phone number is required';
        } else {
          const phoneValidation = validatePhone(signupForm.assistantPhone);
          if (!phoneValidation.isValid) {
            errors.assistantPhone = phoneValidation.error;
          }
        }
      }
    } else {
      // Login validation
      if (!loginForm.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
        errors.email = 'Please enter a valid email address';
      }
      
      if (!loginForm.password) {
        errors.password = 'Password is required';
      }
    }
    
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e, isSignup = false) => {
    e.preventDefault();
    setMessage('');
    setFieldErrors({});
    
    // Validate form
    const errors = validateForm(isSignup);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    
    setLoading(true);

    try {
      let endpoint = '';
      let body = {};

      if (isSignup) {
        // Signup logic
        if (userType === 'superadmin') {
          endpoint = '/auth/superadmin/signup';
          body = {
            name: signupForm.name,
            email: signupForm.email,
            password: signupForm.password,
            adminkey: signupForm.adminkey
          };
        } else if(userType === 'user') {
          // Validate and format phones before sending
          const mainPhoneValidation = validatePhone(signupForm.mainPhone);
          const assistantPhoneValidation = validatePhone(signupForm.assistantPhone);
          
          endpoint = '/auth/user/signup';
          body = {
            name: signupForm.name,
            email: signupForm.email,
            password: signupForm.password,
            mainPhone: removePlus(parsePhoneNumber(signupForm.mainPhone).number),
            assistantPhone: removePlus(parsePhoneNumber(signupForm.assistantPhone).number),
            adminCode: signupForm.adminCode
          };
        }
      } else {
        // Login logic
        if (userType === 'superadmin') {
          endpoint = '/auth/superadmin/login';
        } else if (userType === 'admin') {
          endpoint = '/auth/admin/login';
        } else {
          endpoint = '/auth/user/login';
        }
        
        body = {
          email: loginForm.email,
          password: loginForm.password
        };
      }

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Success!');
        setMessageType('success');
        
        if (isSignup) {
          // Redirect to login after successful signup
          setTimeout(() => {
            setCurrentView('login');
            resetForms();
          }, 1500);
        } else {
          // Redirect to respective dashboard after login
          setTimeout(() => {
            if (userType === 'superadmin') {
              window.location.href = '/super-admin/dashboard';
            } else if (userType === 'admin') {
              window.location.href = '/admin/dashboard';
            } else {
              window.location.href = '/user/dashboard';
            }
          }, 1500);
        }
      } else {
        // Handle API errors (400, 500+) - show at bottom of last input
        setMessage(data.message || 'Something went wrong!');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setMessage(error.message || 'Network error occurred');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const resetForms = () => {
    setLoginForm({ email: '', password: '' });
    setSignupForm({
      name: '',
      email: '',
      password: '',
      adminkey: '',
      mainPhone: '',
      assistantPhone: '',
      adminCode: ''
    });
    setMessage('');
    setFieldErrors({});
  };

  const handlePhoneChange = (field, value) => {
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    setSignupForm(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (field, value, isLogin = false) => {
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    if (isLogin) {
      setLoginForm(prev => ({ ...prev, [field]: value }));
    } else {
      setSignupForm(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-purple-800 mb-2">
            {currentView === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600">
            {currentView === 'login' ? 'Sign in to your account' : 'Join us today'}
          </p>
        </motion.div>

        {/* User Type Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex mb-6 bg-purple-100 rounded-lg p-1"
        >
          {getUserTypes().map((type) => (
            <button
              key={type}
              onClick={() => {
                setUserType(type);
                resetForms();
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                userType === type
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-purple-600 hover:bg-purple-200'
              }`}
            >
              {type === 'superadmin' ? 'Super Admin' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Forms */}
        <AnimatePresence mode="wait">
          <motion.form
            key={currentView}
            initial={{ opacity: 0, x: currentView === 'login' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: currentView === 'login' ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={(e) => handleSubmit(e, currentView === 'signup')}
            className="space-y-4"
          >
            {/* Signup Fields */}
            {currentView === 'signup' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  value={signupForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    fieldErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {fieldErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
                )}
              </motion.div>
            )}

            {/* Email Field */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={currentView === 'login' ? loginForm.email : signupForm.email}
                onChange={(e) => handleInputChange('email', e.target.value, currentView === 'login')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  fieldErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={currentView === 'login' ? loginForm.password : signupForm.password}
                onChange={(e) => handleInputChange('password', e.target.value, currentView === 'login')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  fieldErrors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {fieldErrors.password && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
              )}
            </div>

            {/* Conditional Fields for Signup */}
            {currentView === 'signup' && (
              <AnimatePresence>
                {userType === 'superadmin' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <input
                      type="password"
                      placeholder="Admin Key"
                      value={signupForm.adminkey}
                      onChange={(e) => handleInputChange('adminkey', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                        fieldErrors.adminkey ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {fieldErrors.adminkey && (
                      <p className="text-red-500 text-sm mt-1">{fieldErrors.adminkey}</p>
                    )}
                  </motion.div>
                )}

                {userType === 'user' && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <input
                        type="text"
                        placeholder="Admin Code"
                        value={signupForm.adminCode}
                        onChange={(e) => handleInputChange('adminCode', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                          fieldErrors.adminCode ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {fieldErrors.adminCode && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.adminCode}</p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <input
                        type="tel"
                        placeholder="Main Phone (+1234567890)"
                        value={signupForm.mainPhone}
                        onChange={(e) => handlePhoneChange('mainPhone', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                          fieldErrors.mainPhone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {fieldErrors.mainPhone && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.mainPhone}</p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <input
                        type="tel"
                        placeholder="Assistant Phone (+1234567890)"
                        value={signupForm.assistantPhone}
                        onChange={(e) => handlePhoneChange('assistantPhone', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                          fieldErrors.assistantPhone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {fieldErrors.assistantPhone && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.assistantPhone}</p>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            )}

            {/* API Error Message (shown at bottom of last input) */}
            {message && messageType === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-sm mt-2 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                {message}
              </motion.div>
            )}

            {/* Success Message */}
            {message && messageType === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-green-800 text-sm mt-2 p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                {message}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                currentView === 'login' ? 'Sign In' : 'Create Account'
              )}
            </motion.button>
          </motion.form>
        </AnimatePresence>

        {/* Toggle Between Login/Signup */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-600">
            {currentView === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setCurrentView(currentView === 'login' ? 'signup' : 'login');
                resetForms();
              }}
              className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
            >
              {currentView === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthSystem;