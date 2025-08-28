import { FaRegTrashAlt, FaPlay, FaVideo, FaCalendarAlt, FaClock } from "react-icons/fa";
import StatusIndicator from "./StatusIndicator";

export default function ClassCard({ classData: cls, index, onStartClass, onDeleteClass }) {
  return (
    <div
      className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-green-200/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-green-100 transform hover:scale-[1.02] transition-all duration-300 group animate-slide-up"
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main class information */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-300 truncate">
                  {cls.title}
                </h3>
                <div className="flex-shrink-0">
                  <StatusIndicator status={cls.status} />
                </div>
              </div>
              <p className="text-gray-600 mb-3 text-sm sm:text-base line-clamp-2">
                {cls.subject}
              </p>
              
              {/* Class Details - Stack on mobile */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-blue-500 flex-shrink-0" />
                  <span className="truncate">
                    <strong>Scheduled:</strong>{' '}
                    {cls.scheduled_at === "now" ? "Now" : new Date(cls.scheduled_at).toLocaleDateString()}
                  </span>
                </div>
                {cls.scheduled_at !== "now" && (
                  <div className="flex items-center space-x-2">
                    <FaClock className="text-purple-500 flex-shrink-0" />
                    <span className="truncate">
                      <strong>Time:</strong> {new Date(cls.scheduled_at).toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Access Code Display */}
          <div className="bg-green-50 border border-green-200 rounded-lg sm:rounded-xl p-3 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-xs sm:text-sm text-green-700 font-medium">Access Code:</span>
                <span className="ml-2 text-base sm:text-lg font-bold text-green-800 break-all">
                  {cls.access_code}
                </span>
              </div>
              <div className="text-xs text-green-600 flex-shrink-0">Share with students</div>
            </div>
          </div>
        </div>

        {/* Actions - Stack on mobile, side-by-side on larger screens */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 sm:gap-3 lg:w-auto">
          {/* Start/Join Button */}
          <button 
            onClick={() => onStartClass(cls)}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base whitespace-nowrap ${
              cls.status?.toLowerCase() === 'ended'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : cls.status?.toLowerCase() === 'live'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-blue-200'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-green-200'
            }`}
            disabled={cls.status?.toLowerCase() === 'ended'}
          >
            {cls.status?.toLowerCase() === 'live' ? (
              <>
                <FaVideo className="flex-shrink-0" />
                <span>Join Live</span>
              </>
            ) : cls.status?.toLowerCase() === 'ended' ? (
              <>
                <span>⏹️</span>
                <span>Ended</span>
              </>
            ) : (
              <>
                <FaPlay className="flex-shrink-0" />
                <span>Start Class</span>
              </>
            )}
          </button>

          <div className="flex gap-2 sm:gap-3">
            {/* Delete Button */}
            <button 
              onClick={() => onDeleteClass(cls.id)}
              className="flex-1 sm:flex-none bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
              title="Delete class"
            >
              <FaRegTrashAlt className="w-4 h-4" />
            </button>

            {/* Details Dropdown */}
            <details className="flex-1 sm:flex-none relative group">
              <summary className="cursor-pointer p-2 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-lg sm:rounded-xl transition-colors duration-300 list-none text-center">
                <span className="text-gray-600 font-bold">⋯</span>
              </summary>
              <div className="absolute bg-white shadow-2xl border border-green-100 p-4 rounded-xl right-0 top-12 text-sm w-64 sm:min-w-64 z-10 max-h-80 overflow-y-auto">
                <div className="space-y-3">
                  <div className="border-b border-gray-100 pb-2">
                    <h5 className="font-bold text-green-700 mb-2">Class Details</h5>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div><strong>ID:</strong> <span className="break-all">{cls.id}</span></div>
                    <div><strong>Access Code:</strong> <span className="break-all">{cls.access_code}</span></div>
                    <div><strong>Status:</strong> {cls.status}</div>
                    <div><strong>Title:</strong> <span className="break-words">{cls.title}</span></div>
                    <div><strong>Subject:</strong> <span className="break-words">{cls.subject}</span></div>
                    <div><strong>Scheduled:</strong> <span className="break-words">
                      {cls.scheduled_at === "now" ? "Now" : new Date(cls.scheduled_at).toLocaleString()}
                    </span></div>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}