import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  FileText,
  Image,
  File,
  Calendar,
  User,
  FolderOpen,
  Eye,
  Share2
} from 'lucide-react';
import { CompactUserLoadingSpinner } from './UserLoadingSpinner';

export default function UserLibraryDetailsModal({ 
  isOpen, 
  onClose, 
  library
}) {
  const [files, setFiles] = useState([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);

  useEffect(() => {
    if (isOpen && library) {
      fetchLibraryFiles();
    }
  }, [isOpen, library]);
const baseURL = import.meta.env.VITE_API_URL
  const fetchLibraryFiles = async () => {
    if (!library) return;
    
    setIsLoadingFiles(true);
    try {
      const response = await fetch(`${baseURL}/library/get-library/${library.id}`,{
        method:"GET",
        credentials:"include"
      }
      );
      const data = await response.json();
      
      if (data.status === 200) {
        setFiles(data.files || []);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleDownloadFile = async (fileId, fileName) => {
    try {
      const response = await fetch(`${baseURL}/library/download/${fileId}`,{
        method:"GET",
        credentials:"include"
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const handleDownloadLibrary = async () => {
    try {
      const response = await fetch(`${baseURL}/library/download-library/${library.id}`,
        {
        method:"GET",
        credentials:"include"
      }
      );
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
      console.error('Download library error:', error);
    }
  };

  const getFileIcon = (type) => {
    if (type?.startsWith('image/')) return Image;
    if (type?.includes('pdf') || type?.includes('document')) return FileText;
    return File;
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  if (!library) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-2 right-8 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
              </div>

              <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1 pr-8">
                  <h2 className="text-2xl font-bold mb-2">{library.name}</h2>
                  <p className="text-blue-100 mb-4">
                    {library.description || 'No description available'}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-blue-100">
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{library.total_files || 0} resources</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Added {formatDate(library.created_at)}</span>
                    </div>
                    {library.uploaded_by && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>By {library.uploaded_by}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadLibrary}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2"
                    title="Download entire library"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download All</span>
                  </motion.button>
                  
                  <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto max-h-[60vh] p-8">
              {isLoadingFiles ? (
                <CompactUserLoadingSpinner message="Loading resources..." />
              ) : files.length === 0 ? (
                <div className="text-center py-12">
                  <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources available</h3>
                  <p className="text-gray-600">This library doesn't contain any files yet.</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Available Resources ({files.length})
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Eye className="w-4 h-4" />
                      <span>Click any file to download</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {files.map((file, index) => {
                      const FileIcon = getFileIcon(file.mime_type);
                      return (
                        <motion.div
                          key={file.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleDownloadFile(file.id, file.original_name)}
                          className="bg-gray-50 hover:bg-blue-50 border hover:border-blue-200 rounded-xl p-4 transition-all duration-200 group cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-white group-hover:bg-blue-100 p-3 rounded-lg transition-colors duration-200">
                              <FileIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 group-hover:text-blue-900 truncate transition-colors duration-200">
                                {file.original_name}
                              </h4>
                              <div className="flex items-center gap-4 mt-1">
                                <p className="text-sm text-gray-500">
                                  {formatFileSize(file.file_size)}
                                </p>
                              </div>
                            </div>
                            
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                                <Download className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Download All Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: files.length * 0.1 + 0.3 }}
                    className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Download Complete Library
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Get all {files.length} resources in a single ZIP file
                        </p>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDownloadLibrary}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download ZIP</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}