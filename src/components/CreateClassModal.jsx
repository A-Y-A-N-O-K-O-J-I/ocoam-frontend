import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function CreateClassModal({ onClose, onSubmit }) {
  const [createForm, setCreateForm] = useState({
    title: "",
    subject: "",
    date: "",
    time: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!createForm.title.trim() || !createForm.subject.trim()) {
      alert("Please fill in both title and subject fields.");
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

      await onSubmit(payload);
    } catch (error) {
      console.error("Failed to create class:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-md sm:max-w-lg mx-auto shadow-2xl transform animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4 sm:mb-6 sticky top-0 bg-white pb-2">
          <div className="min-w-0 flex-1 pr-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Create New Class</h3>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Set up a new traditional medicine class</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">
              Class Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={createForm.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-green-500 transition-colors duration-300 text-sm sm:text-base"
              placeholder="e.g., Introduction to Herbal Medicine"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={createForm.subject}
              onChange={handleInputChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-green-500 transition-colors duration-300 text-sm sm:text-base"
              placeholder="e.g., Traditional Yoruba Medicine"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-bold text-gray-700 mb-2">
                Date (Optional)
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={createForm.date}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-green-500 transition-colors duration-300 text-sm sm:text-base"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-bold text-gray-700 mb-2">
                Time (Optional)
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={createForm.time}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:border-green-500 transition-colors duration-300 text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-50 font-bold transition-all duration-300 text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg sm:rounded-xl font-bold transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⏳</span>
                  Creating...
                </span>
              ) : (
                "Create Class"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}