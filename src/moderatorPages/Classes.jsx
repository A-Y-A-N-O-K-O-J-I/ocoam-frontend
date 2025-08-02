import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ModeratorNavBar from "../components/ModeratorNavbar";
import { FaRegTrashAlt, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ClassesList() {
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [openCard, setOpenCard] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    title: "",
    subject: "",
    date: "",
    time: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const handleToggleDetails = (id) => {
    setOpenCard(openCard === id ? null : id);
  };

  // Confirmation Dialog Component
  const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Action</h3>
            <p className="text-gray-600">{message}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Notification component
  const Notification = ({ message, type, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

    return (
      <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3`}>
        <span>{message}</span>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <FaTimes size={14} />
        </button>
      </div>
    );
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  // Status indicator component
  const StatusIndicator = ({ status }) => {
    const getStatusConfig = () => {
      switch (status?.toLowerCase()) {
        case 'live':
          return {
            color: 'bg-green-500',
            animation: 'animate-pulse',
            label: 'Live'
          };
        case 'scheduled':
          return {
            color: 'bg-yellow-500',
            animation: 'animate-pulse',
            label: 'Scheduled'
          };
        case 'ended':
          return {
            color: 'bg-red-500',
            animation: '',
            label: 'Ended'
          };
        default:
          return {
            color: 'bg-gray-500',
            animation: '',
            label: 'Unknown'
          };
      }
    };

    const config = getStatusConfig();

    return (
      <div className="flex items-center gap-2">
        <div 
          className={`w-3 h-3 rounded-full ${config.color} ${config.animation}`}
          title={config.label}
        ></div>
        <span className="text-xs text-gray-600">{config.label}</span>
      </div>
    );
  };

  const handleCreateClass = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setCreateForm({
      title: "",
      subject: "",
      date: "",
      time: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // START CLASS FUNCTION - THE IMPORTANT ONE!
  const handleStartClass = async (cls) => {
    if (cls.status?.toLowerCase() === 'live') {
      // Already live, just join
      navigate(`/class/${cls.access_code}?role=moderator`);
      return;
    }

    try {
      // Call backend to start the class (change status to live)
      const response = await fetch(`http://localhost:3030/classes/start-class/${cls.access_code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        showNotification('Class started successfully!', 'success');
        
        // Refresh classes to show updated status
        fetchClasses();
        
        // Redirect to video call
        setTimeout(() => {
          navigate(`/class/${cls.access_code}?role=moderator`);
        }, 1000);
      } else {
        throw new Error('Failed to start class');
      }
    } catch (error) {
      console.error('Error starting class:', error);
      showNotification('Failed to start class. Please try again.', 'error');
    }
  };

  const handleSubmitClass = async (e) => {
    e.preventDefault();
    
    if (!createForm.title.trim() || !createForm.subject.trim()) {
      showNotification("Please fill in both title and subject fields.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      let scheduledAt = "now";
      if (createForm.date && createForm.time) {
        scheduledAt = new Date(`${createForm.date}T${createForm.time}`).toISOString();
      } else if (createForm.date) {
        scheduledAt = new Date(`${createForm.date}T00:00`).toISOString();
      }

      const payload = {
        title: createForm.title.trim(),
        subject: createForm.subject.trim(),
        scheduled_at: scheduledAt
      };

      const response = await axios.post(`${baseURL}/classes/create-classes`, payload, {
        withCredentials: true,
      });

      fetchClasses();
      handleCloseModal();
      showNotification("Class created successfully!", "success");
      
    } catch (error) {
      console.error("Failed to create class:", error);
      showNotification("Failed to create class. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
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
      await axios.delete(`${baseURL}/classes/delete-class/${classId}`, {
        withCredentials: true,
      });
      
      fetchClasses();
      showNotification("Class deleted successfully!", "success");
      
    } catch (error) {
      console.error("Failed to delete class:", error);
      showNotification("Failed to delete class. Please try again.", "error");
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${baseURL}/classes/list-classes`, {
        withCredentials: true,
      });
      setClasses(response.data.classes || []);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <>
      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
      
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <ModeratorNavBar />

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <nav className="w-full bg-blue-500 sticky top-0 z-50 h-10 overflow-hidden transition-all duration-500 ease-in-out">
            <div className="flex justify-center py-2 space-x-5 items-center">
              <p className="md:font-extrabold font-bold text-white">O.C.O.Y.A.M</p>
              <span className="md:font-extrabold font-bold text-white">Moderator</span>
            </div>
          </nav>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Classes</h2>
              <Button onClick={handleCreateClass}>Create Class</Button>
            </div>

            {classes?.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No classes available
              </p>
            ) : (
              <div className="grid gap-4">
                {classes.map((cls) => (
                  <div
                    key={cls.id}
                    className="bg-white shadow p-4 rounded-lg mb-4 flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{cls.title}</h3>
                        <StatusIndicator status={cls.status} />
                      </div>
                      <p className="text-sm text-gray-500">{cls.subject}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleStartClass(cls)}
                        className={`px-4 py-2 rounded font-medium transition-colors ${
                          cls.status?.toLowerCase() === 'ended'
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : cls.status?.toLowerCase() === 'live'
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                        disabled={cls.status?.toLowerCase() === 'ended'}
                      >
                        {cls.status?.toLowerCase() === 'live' ? '🎥 Join' : 
                         cls.status?.toLowerCase() === 'ended' ? 'Ended' : '▶ Start'}
                      </button>

                      <button 
                        onClick={() => handleDeleteClass(cls.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        <FaRegTrashAlt />
                      </button>

                      <details className="relative group">
                        <summary className="cursor-pointer px-2">⋯</summary>
                        <div className="absolute bg-white shadow p-2 rounded right-0 top-6 text-sm hidden group-open:block z-10 min-w-48">
                          <p className="mb-1">
                            <strong>Access Code:</strong> {cls.access_code}
                          </p>
                          <p className="mb-1">
                            <strong>ID:</strong> {cls.id}
                          </p>
                          <p className="mb-1">
                            <strong>Status:</strong> {cls.status}
                          </p>
                          <p>
                            <strong>Scheduled At:</strong>{" "}
                            {cls.scheduled_at === "now"
                              ? "Now"
                              : new Date(cls.scheduled_at).toLocaleString()}
                          </p>
                        </div>
                      </details>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Create Class Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Create New Class</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmitClass} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={createForm.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter class title"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={createForm.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter subject"
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date (Optional)
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={createForm.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time (Optional)
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={createForm.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                  >
                    {isSubmitting ? "Creating..." : "Create Class"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Confirmation Dialog */}
        {confirmDialog && (
          <ConfirmDialog
            message={confirmDialog.message}
            onConfirm={confirmDialog.onConfirm}
            onCancel={confirmDialog.onCancel}
          />
        )}

        {/* Notification */}
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={closeNotification}
          />
        )}
      </div>
    </>
  );
}