import { motion } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  Calendar,
  User,
  Download,
  ChevronRight,
  Eye
} from 'lucide-react';

export default function UserLibraryList({ libraries, onLibraryClick }) {
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
    if (!totalFiles || totalFiles === 0) return '0 resources';
    return totalFiles === 1 ? '1 resource' : `${totalFiles} resources`;
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return 'No description available';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleDownloadLibrary = async (library, e) => {
    e.stopPropagation();
    try {
        const baseURL = import.meta.env.VITE_API_URL
    const response = await fetch(`${baseURL}/library/download-library/${library.id}`,{
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
          onClick={() => onLibraryClick(library)}
          className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300 cursor-pointer group overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <BookOpen className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {library.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                        <FileText className="w-3 h-3" />
                        {formatFileSize(library.total_files)}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                      {truncateText(library.description)}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Added {formatDate(library.created_at)}</span>
                      </div>
                      
                      {library.uploaded_by && (
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>By {library.uploaded_by}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => onLibraryClick(library)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1 text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline">View</span>
                    </button>
                    
                    <button
                      onClick={(e) => handleDownloadLibrary(library, e)}
                      className="bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800 p-2 rounded-lg transition-colors duration-200"
                      title="Download entire library"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-gray-300 group-hover:text-blue-500 transition-colors duration-200">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </motion.div>
      ))}
    </motion.div>
  );
}