export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md mx-auto shadow-2xl transform animate-scale-in">
        <div className="text-center mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <span className="text-xl sm:text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Confirm Action</h3>
          <p className="text-gray-600 text-sm sm:text-base px-2">{message}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCancel}
            className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-50 font-medium transition-all duration-300 text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg sm:rounded-xl hover:from-red-600 hover:to-red-700 font-medium transition-all duration-300 shadow-lg text-sm sm:text-base"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}