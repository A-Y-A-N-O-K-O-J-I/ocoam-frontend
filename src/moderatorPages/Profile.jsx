import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Shield, Edit3, Save, X, Camera } from "lucide-react";
import MobileNavigation from "../components/MobileNavigation";
import axios from "axios";

export default function ProfileSection() {
  const baseURL = import.meta.env.VITE_API_URL;
  
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    role: "Moderator",
    created_at: "",
    avatar: null
  });
  
  const [formData, setFormData] = useState(profile);

  // Fetch profile data from backend
  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/moderator/profile`, {
          withCredentials: true,
        });
        const profileData = response.data.profile || {};
        setProfile(profileData);
        setFormData(profileData);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    }
    
    fetchProfile();
  }, [baseURL]);

  const handleEditToggle = () => {
    setEditing(!editing);
    setFormData(profile); // Reset form
    setError(null);
    setSuccess(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      
      const response = await axios.put(`${baseURL}/moderator/profile`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setProfile(response.data.profile || formData);
      setEditing(false);
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (error) {
      console.error("Failed to update profile:", error);
      setError(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Fixed Header */}
          <nav className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 sticky top-0 z-50 h-16 shadow-lg shadow-green-200/50 flex-shrink-0">
            <MobileNavigation />
            <div className="flex justify-center py-4 space-x-6 items-center relative">
              <div className="absolute inset-0 bg-green-400/10 animate-pulse"></div>
              <div className="relative z-10 flex items-center space-x-6">
                <h1 className="text-xl md:text-2xl font-black text-white tracking-wider drop-shadow-lg">
                  O.C.O.Y.A.M
                </h1>
                <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white font-bold text-sm">
                  Moderator
                </span>
              </div>
            </div>
          </nav>
          
          {/* Loading State */}
          <div className="flex-1 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
              <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-green-700 font-medium">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <nav className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 sticky top-0 z-50 h-16 shadow-lg shadow-green-200/50 flex-shrink-0">
          <MobileNavigation />
          <div className="flex justify-center py-4 space-x-6 items-center relative">
            <div className="absolute inset-0 bg-green-400/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center space-x-6">
              <h1 className="text-xl md:text-2xl font-black text-white tracking-wider drop-shadow-lg">
                O.C.O.Y.A.M
              </h1>
              <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white font-bold text-sm">
                Moderator
              </span>
            </div>
          </div>
        </nav>
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-green-50 to-emerald-100 p-6">
          {/* Enhanced Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-6 text-white shadow-2xl shadow-green-300/30 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Profile Settings ⚙️</h2>
                  <p className="text-green-100">Manage your moderator account information</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-3xl">👤</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl shadow-lg animate-fade-in">
              <div className="flex items-center space-x-2">
                <span className="text-xl">✅</span>
                <span className="font-medium">Profile updated successfully!</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <span className="text-xl">❌</span>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Profile Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm shadow-2xl hover:shadow-green-200/50 rounded-2xl border border-green-100 transform hover:scale-[1.01] transition-all duration-300 overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                  {/* Avatar */}
                  <div className="relative group">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold shadow-xl">
                      {profile.avatar ? (
                        <img 
                          src={profile.avatar} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        profile.full_name?.charAt(0)?.toUpperCase() || 'M'
                      )}
                    </div>
                    {editing && (
                      <button className="absolute -bottom-2 -right-2 bg-white text-green-600 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                        <Camera size={16} />
                      </button>
                    )}
                  </div>
                  
                  {/* Profile Info */}
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-2xl font-bold mb-2">{profile.full_name || 'Moderator'}</h3>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        {profile.role}
                      </span>
                      <span className="px-3 py-1 bg-emerald-500/30 backdrop-blur-sm rounded-full text-sm font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                  
                  {/* Edit Button */}
                  <div className="flex space-x-2">
                    {!editing ? (
                      <button
                        onClick={handleEditToggle}
                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300 backdrop-blur-sm"
                      >
                        <Edit3 size={16} />
                        <span>Edit Profile</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSave}
                          disabled={saving}
                          className="bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300 disabled:opacity-50"
                        >
                          <Save size={16} />
                          <span>{saving ? 'Saving...' : 'Save'}</span>
                        </button>
                        <button
                          onClick={handleEditToggle}
                          className="bg-red-500/20 hover:bg-red-500/30 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300"
                        >
                          <X size={16} />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-8">
                {editing ? (
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-green-700 font-medium">
                        <User size={18} />
                        <span>Full Name</span>
                      </label>
                      <input
                        name="full_name"
                        value={formData.full_name || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors duration-300 bg-white/50 backdrop-blur-sm"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-green-700 font-medium">
                        <Mail size={18} />
                        <span>Email Address</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email || ''}
                        disabled
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
                        placeholder="Enter your email address"
                      />
                      <p className="text-sm text-gray-500">Email cannot be modified</p>
                    </div>

                    {/* Role (Read-only) */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-green-700 font-medium">
                        <Shield size={18} />
                        <span>Role</span>
                      </label>
                      <input
                        value={profile.role || 'Moderator'}
                        disabled
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
                      />
                      <p className="text-sm text-gray-500">Role cannot be modified</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Profile Information Display */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-green-50/50 rounded-xl p-4 border border-green-100">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <User size={16} className="text-white" />
                          </div>
                          <span className="font-medium text-green-700">Full Name</span>
                        </div>
                        <p className="text-gray-700 ml-11">{profile.full_name || 'Not provided'}</p>
                      </div>

                      <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <Mail size={16} className="text-white" />
                          </div>
                          <span className="font-medium text-blue-700">Email</span>
                        </div>
                        <p className="text-gray-700 ml-11">{profile.email || 'Not provided'}</p>
                      </div>

                      <div className="bg-purple-50/50 rounded-xl p-4 border border-purple-100">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <Shield size={16} className="text-white" />
                          </div>
                          <span className="font-medium text-purple-700">Role</span>
                        </div>
                        <p className="text-gray-700 ml-11">{profile.role}</p>
                      </div>

                      <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">📅</span>
                          </div>
                          <span className="font-medium text-emerald-700">Member Since</span>
                        </div>
                        <p className="text-gray-700 ml-11">
                          {profile.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : 'Not available'}
                        </p>
                      </div>
                    </div>

                    {/* Account Status */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-green-800 mb-2">Account Status</h4>
                          <p className="text-green-600">Your moderator account is active and in good standing</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                          <span className="text-green-700 font-medium">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-8 mt-12">
            <div className="inline-flex items-center space-x-2 text-green-600">
              <span className="text-xl animate-bounce">🌿</span>
              <p className="text-sm font-medium">Empowering Education in Traditional Yoruba Medicine</p>
              <span className="text-xl animate-bounce" style={{animationDelay: '0.5s'}}>🌿</span>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}