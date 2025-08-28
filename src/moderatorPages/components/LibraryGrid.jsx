import { motion } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  Calendar,
  User,
  Download,
  MoreVertical,
  FolderOpen
} from 'lucide-react';

export default function LibraryGrid({ libraries, onLibraryClick }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handleCardClick = (library, e) => {
    // Prevent card click when clicking on action buttons
    if (e.target.closest('.action-button')) {
      return;
    }
    onLibraryClick(library);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {libraries.map((library, index) => (
        <motion.div
          key={library.id}
          variants={cardVariants}
          whileHover={{ 
            y: -8, 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => handleCardClick(library, e)}
          className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-green-200 transition-all duration-300 cursor-pointer group overflow-hidden"
        >
          {/* Header with gradient background */}
          <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 right-2 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full blur-lg"></div>
            </div>

            <div className="relative z-10 flex items-start justify-between">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              
              <div className="action-button opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
                  title="More options"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Library name */}
            <h3 className="text-xl font-bold mt-4 mb-2 line-clamp-2 leading-tight">
              {library.name}
            </h3>

            {/* File count badge */}
            <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              <FileText className="w-3 h-3" />
              <span>{library.total_files || 0} files</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Description */}
            {library.description && (
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {truncateText(library.description)}
              </p>
            )}

            {/* Metadata */}
            <div className="space-y-3">
              {/* Created date */}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>Created {formatDate(library.created_at)}</span>
              </div>

              {/* Created by */}
              {library.uploaded_by && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <User className="w-3 h-3" />
                  <span>By {library.uploaded_by}</span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100">
              <button
                className="action-button flex-1 bg-green-50 hover:bg-green-100 text-green-700 py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                title="Open library"
                onClick={() => onLibraryClick(library)}
              >
                <FolderOpen className="w-4 h-4" />
                <span>Open</span>
              </button>
              
              <button
                className="action-button bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800 p-2 rounded-lg transition-colors duration-200"
                title="Download library"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </motion.div>
      ))}
    </motion.div>
  );
}