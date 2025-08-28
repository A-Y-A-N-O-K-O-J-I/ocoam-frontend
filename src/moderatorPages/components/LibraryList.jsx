import { motion } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  Calendar,
  User,
  Download,
  MoreVertical,
  ChevronRight,
  FolderOpen
} from 'lucide-react';

export default function LibraryList({ libraries, onLibraryClick }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (totalFiles) => {
    if (!totalFiles || totalFiles === 0) return '0 files';
    return totalFiles === 1 ? '1 file' : `${totalFiles} files`;
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return 'No description available';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const handleItemClick = (library, e) => {
    // Prevent item click when clicking on action buttons
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
      className="space-y-3"
    >
      {libraries.map((library, index) => (
        <motion.div
          key={library.id}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.01,
            transition: { duration: 0.2 }
          }}
          onClick={(e) => handleItemClick(library, e)}
          className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:border-green-200 transition-all duration-300 cursor-pointer group overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <BookOpen className="w-6 h-6 text-white" />
              </div>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Title and file count */}
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {library.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                        <FileText className="w-3 h-3" />
                        {formatFileSize(library.total_files)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                      {truncateText(library.description)}
                    </p>

                    {/* Metadata row */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Created {formatDate(library.created_at)}</span>
                      </div>
                      
                      {library.uploaded_by && (
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>By {library.uploaded_by}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      className="action-button bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1 text-sm font-medium"
                      title="Open library"
                      onClick={()=> onLibraryClick(library)}
                    >
                      <FolderOpen className="w-4 h-4" />
                      <span className="hidden sm:inline">Open</span>
                    </button>
                    
                    <button
                      className="action-button bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800 p-2 rounded-lg transition-colors duration-200"
                      title="Download library"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    
                    <button
                      className="action-button text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
                      title="More options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Arrow indicator */}
                  <div className="text-gray-300 group-hover:text-green-500 transition-colors duration-200">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom border animation */}
          <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </motion.div>
      ))}

      {/* Alternative compact row layout for smaller screens */}
      <style jsx>{`
        @media (max-width: 640px) {
          .library-list-item {
            padding: 1rem;
          }
          
          .library-list-content {
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .library-actions {
            justify-content: space-between;
            opacity: 1;
          }
        }
      `}</style>
    </motion.div>
  );
}