import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ModeratorNavBar from "../components/ModeratorNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import modular components
import MobileNavigation from "../components/MobileNavigation";
import ClassCard from "../components/ClassCard";
import CreateClassModal from "../components/CreateClassModal";
import ConfirmDialog from "../components/ConfirmDialog";
import Notification from "../components/Notification";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { useClasses } from "../hooks/useClasses";

export default function ClassesList() {
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  
  // Custom hook for classes management
  const {
    classes,
    fetchClasses,
    createClass,
    deleteClass,
    startClass
  } = useClasses(baseURL);

  // Local state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  // Notification handlers
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  // Modal handlers
  const handleCreateClass = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  // Class actions
  const handleStartClass = async (cls) => {
    try {
      await startClass(cls);
      showNotification('Class started successfully!', 'success');
      setTimeout(() => {
        navigate(`/class/${cls.access_code}?role=moderator`);
      }, 1000);
    } catch (error) {
      showNotification('Failed to start class. Please try again.', 'error');
    }
  };

  const handleSubmitClass = async (formData) => {
    try {
      await createClass(formData);
      handleCloseModal();
      showNotification("Class created successfully!", "success");
    } catch (error) {
      showNotification("Failed to create class. Please try again.", "error");
    }
  };

  const handleDeleteClass = async (classId) => {
    setConfirmDialog({
      message: "Are you sure you want to delete this class? This action cannot be undone.",
      onConfirm: () => confirmDelete(classId),
      onCancel: () => setConfirmDialog(null)
    });
  };

  const confirmDelete = async (classId) => {
    setConfirmDialog(null);
    try {
      await deleteClass(classId);
      showNotification("Class deleted successfully!", "success");
    } catch (error) {
      showNotification("Failed to delete class. Please try again.", "error");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Mobile Navigation */}
      <MobileNavigation />

      {/* Desktop Sidebar - Hidden on mobile, shown on larger screens */}
      

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <PageHeader />

        {/* Content area with proper mobile padding */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-x-hidden">
          {/* Page title and create button */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                    Classes Management 🎓
                  </h2>
                  <p className="text-green-100 text-sm sm:text-base">
                    Create and manage traditional medicine classes
                  </p>
                </div>
                <div className="hidden sm:block flex-shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xl sm:text-2xl lg:text-3xl">📚</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-green-800">All Classes</h3>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 py-1 sm:py-2 shadow-lg">
                <span className="text-green-700 font-semibold text-sm sm:text-base">
                  {classes.length} Total
                </span>
              </div>
            </div>
            <Button 
              onClick={handleCreateClass}
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="mr-2">➕</span> Create Class
            </Button>
          </div>

          {/* Classes list or empty state */}
          {classes?.length === 0 ? (
            <EmptyState onCreateClass={handleCreateClass} />
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {classes.map((cls, index) => (
                <ClassCard
                  key={cls.id}
                  classData={cls}
                  index={index}
                  onStartClass={handleStartClass}
                  onDeleteClass={handleDeleteClass}
                />
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="text-center py-6 sm:py-8 mt-8 sm:mt-12">
            <div className="inline-flex items-center space-x-2 text-green-600">
              <span className="text-lg sm:text-xl animate-bounce">🎓</span>
              <p className="text-xs sm:text-sm font-medium">
                Advancing Traditional Medicine Education
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

      {/* Modals and notifications */}
      {showCreateModal && (
        <CreateClassModal
          onClose={handleCloseModal}
          onSubmit={handleSubmitClass}
        />
      )}

      {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}
