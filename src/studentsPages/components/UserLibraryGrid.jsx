import { motion } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  Calendar,
  User,
  Download,
  FolderOpen,
  Eye
} from 'lucide-react';

export default function UserLibraryGrid({ libraries, onLibraryClick }) {
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

  const handleDownloadLibrary = async (library, e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/library/download-library/${library.id}`,{
        method:"GET",
        credentials:"include"
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${library.name}_library.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
    }
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
          onClick={() => onLibraryClick(library)}
          className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 cursor-pointer group overflow-hidden"
        >
          <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 right-2 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full blur-lg"></div>
            </div>

            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl w-fit mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight">
                {library.name}
              </h3>

              <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                <FileText className="w-3 h-3" />
                <span>{library.total_files || 0} resources</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {library.description && (
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {truncateText(library.description)}
              </p>
            )}

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>Added {formatDate(library.created_at)}</span>
              </div>

              {library.uploaded_by && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <User className="w-3 h-3" />
                  <span>By {library.uploaded_by}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onLibraryClick(library)}
                className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
              
              <button
                onClick={(e) => handleDownloadLibrary(library, e)}
                className="bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800 p-2 rounded-lg transition-colors duration-200"
                title="Download entire library"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </motion.div>
      ))}
    </motion.div>
  );
}