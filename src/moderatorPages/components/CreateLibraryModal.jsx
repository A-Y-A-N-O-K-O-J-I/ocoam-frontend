import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Upload, 
  FileText, 
  Image, 
  File,
  Trash2,
  AlertCircle,
  Check,
  BookOpen,
  Plus
} from 'lucide-react';

export default function CreateLibraryModal({ isOpen, onClose, onLibraryCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Library name is required';
    }
    
    if (files.length === 0) {
      newErrors.files = 'At least one file is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    const newFiles = fileArray.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    setErrors(prev => ({ ...prev, files: '' }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeFile = (fileId) => {
    setFiles(prev => {
      const updated = prev.filter(f => f.id !== fileId);
      // Revoke object URL to prevent memory leaks
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return updated;
    });
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return Image;
    if (type.includes('pdf') || type.includes('document')) return FileText;
    return File;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('description', formData.description.trim());
      
      files.forEach(fileItem => {
        formDataToSend.append('files', fileItem.file);
      });
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.random() * 20;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 200);
      const baseURL = import.meta.env.VITE_API_URL
      const response = await fetch(`${baseURL}/library/upload-library`, {
        method: 'POST',
        body: formDataToSend,
        credentials:"include"
      });
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      const data = await response.json();
      
      if (data.status === 200) {
        onLibraryCreated(data.library);
        handleClose();
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setErrors({ submit: error.message });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleClose = () => {
    if (isUploading) return;
    
    // Clean up object URLs
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    
    setFormData({ name: '', description: '' });
    setFiles([]);
    setErrors({});
    setUploadProgress(0);
    onClose();
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

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6 text-white relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-2 right-8 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-2xl">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Create New Library</h2>
                    <p className="text-green-100 mt-1">Upload and organize your educational resources</p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  disabled={isUploading}
                  className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200 disabled:opacity-50"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Library Details */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Library Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter library name..."
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                        errors.name 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-200 focus:border-green-300'
                      }`}
                      disabled={isUploading}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Description (Optional)
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Describe what this library contains..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200 resize-none"
                      disabled={isUploading}
                    />
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-900">
                    Upload Files *
                  </label>

                  {/* Drop Zone */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                      dragActive
                        ? 'border-green-400 bg-green-50'
                        : errors.files
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 hover:border-green-400 hover:bg-green-50/50'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${
                        dragActive ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <Upload className={`w-8 h-8 ${
                          dragActive ? 'text-green-600' : 'text-gray-600'
                        }`} />
                      </div>
                      
                      <div>
                        <p className="text-lg font-semibold text-gray-900 mb-2">
                          Drop files here or click to browse
                        </p>
                        <p className="text-gray-600 text-sm">
                          Support for PDF, DOC, images, and more (Max 50MB per file)
                        </p>
                      </div>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                    disabled={isUploading}
                  />

                  {errors.files && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.files}
                    </p>
                  )}
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">
                      Selected Files ({files.length})
                    </h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {files.map((fileItem) => {
                        const FileIcon = getFileIcon(fileItem.type);
                        return (
                          <motion.div
                            key={fileItem.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                          >
                            <div className="bg-white p-2 rounded-lg">
                              <FileIcon className="w-5 h-5 text-gray-600" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">
                                {fileItem.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatFileSize(fileItem.size)}
                              </p>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => removeFile(fileItem.id)}
                              className="text-gray-400 hover:text-red-500 p-1 transition-colors duration-200"
                              disabled={isUploading}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Progress Bar */}
                {isUploading && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Uploading...</span>
                      <span className="font-medium text-green-600">{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                      />
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {errors.submit && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-700 text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.submit}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isUploading}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isUploading || files.length === 0 || !formData.name.trim()}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Create Library
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}