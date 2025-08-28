import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Edit2, 
  Trash2, 
  Download, 
  Plus,
  FileText,
  Image,
  File,
  Calendar,
  User,
  Save,
  MoreVertical,
  AlertCircle,
  Check,
  Upload,
  FolderOpen,
  Eye,
  Share2
} from 'lucide-react';
import { CompactLoadingSpinner } from './LoadingSpinner';

export default function LibraryDetailsModal({ 
  isOpen, 
  onClose, 
  library, 
  onLibraryUpdated, 
  onLibraryDeleted 
}) {
  const [activeTab, setActiveTab] = useState('details');
  const [files, setFiles] = useState([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isAddingFiles, setIsAddingFiles] = useState(false);
  const [newFiles, setNewFiles] = useState([]);
  
  const [editForm, setEditForm] = useState({
    name: library?.name || '',
    description: library?.description || ''
  });
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && library) {
      fetchLibraryFiles();
      setEditForm({
        name: library.name,
        description: library.description || ''
      });
    }
  }, [isOpen, library]);
const baseURL = import.meta.env.VITE_API_URL
  const fetchLibraryFiles = async () => {
    if (!library) return;
    
    setIsLoadingFiles(true);
    try {
      const response = await fetch(`${baseURL}/library/get-library/${library.id}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials:"include"
      });
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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditForm({
        name: library.name,
        description: library.description || ''
      });
    }
  };

  const handleSaveEdit = async () => {
    if (!editForm.name.trim()) return;
    
    setSaving(true);
    try {
      const response = await fetch(`${baseURL}/library/update-library/${library.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:"include",
        body: JSON.stringify(editForm),
      });
      
      const data = await response.json();
      
      if (data.status === 200) {
        onLibraryUpdated({
          ...library,
          name: editForm.name,
          description: editForm.description
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating library:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${baseURL}/library/delete-library/${library.id}`, {
        method: 'DELETE',
        credentials:"include"
      });
      
      const data = await response.json();
      
      if (data.status === 200) {
        onLibraryDeleted(library.id);
      }
    } catch (error) {
      console.error('Error deleting library:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
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
      console.error('Download library error:', error);
    }
  };

  const handleAddFiles = async () => {
    if (newFiles.length === 0) return;
    
    setIsAddingFiles(true);
    try {
      const formData = new FormData();
      newFiles.forEach(fileItem => {
        formData.append('files', fileItem.file);
      });
      
      const response = await fetch(`${baseURL}/library/add-files/${library.id}`, {
        method: 'POST',
        body: formData,
        credentials:"include"
      });
      
      const data = await response.json();
      
      if (data.status === 200) {
        setNewFiles([]);
        fetchLibraryFiles();
        onLibraryUpdated({
          ...library,
          total_files: library.total_files + data.added_files
        });
      }
    } catch (error) {
      console.error('Error adding files:', error);
    } finally {
      setIsAddingFiles(false);
    }
  };

  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    const fileObjects = fileArray.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type
    }));
    
    setNewFiles(prev => [...prev, ...fileObjects]);
  };

  const removeNewFile = (fileId) => {
    setNewFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const removeExistingFile = async (fileId) => {
    try {
      const response = await fetch(`${baseURL}/library/remove-file/${fileId}`, {
        method: 'DELETE',
        credentials:"include"
      });
      
      const data = await response.json();
      
      if (data.status === 200) {
        setFiles(prev => prev.filter(f => f.id !== fileId));
        onLibraryUpdated({
          ...library,
          total_files: library.total_files - 1
        });
      }
    } catch (error) {
      console.error('Error removing file:', error);
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-2 right-8 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
              </div>

              <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1 pr-8">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        className="text-2xl font-bold bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-white/50"
                        placeholder="Library name"
                      />
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={2}
                        className="text-green-100 bg-white/10 backdrop-blur-sm placeholder-white/50 border border-white/20 rounded-xl px-4 py-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-white/30"
                        placeholder="Library description"
                      />
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{library.name}</h2>
                      <p className="text-green-100 mb-4">
                        {library.description || 'No description available'}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-green-100">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{library.total_files || 0} files</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Created {formatDate(library.created_at)}</span>
                        </div>
                        {library.uploaded_by && (
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>By {library.uploaded_by}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        disabled={isSaving || !editForm.name.trim()}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
                      >
                        {isSaving ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Save
                      </button>
                      <button
                        onClick={handleEditToggle}
                        className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleDownloadLibrary}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-xl transition-all duration-200"
                        title="Download entire library"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={handleEditToggle}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-xl transition-all duration-200"
                        title="Edit library"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm text-white p-2 rounded-xl transition-all duration-200"
                        title="Delete library"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 px-8">
              <div className="flex space-x-8">
                {[
                  { id: 'details', label: 'Files', icon: FileText },
                  { id: 'add', label: 'Add Files', icon: Plus }
                ].map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                        activeTab === tab.id
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {tab.label}
                      {tab.id === 'details' && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          {files.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto max-h-[60vh] p-8">
              {activeTab === 'details' && (
                <div>
                  {isLoadingFiles ? (
                    <CompactLoadingSpinner message="Loading files..." />
                  ) : files.length === 0 ? (
                    <div className="text-center py-12">
                      <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No files yet</h3>
                      <p className="text-gray-600 mb-4">This library doesn't have any files yet.</p>
                      <button
                        onClick={() => setActiveTab('add')}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                      >
                        Add Files
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {files.map((file) => {
                        const FileIcon = getFileIcon(file.mime_type);
                        return (
                          <motion.div
                            key={file.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-all duration-200 group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-white p-3 rounded-lg">
                                <FileIcon className="w-6 h-6 text-gray-600" />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 truncate">
                                  {file.original_name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {formatFileSize(file.file_size)}
                                </p>
                              </div>
                              
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button
                                  onClick={() => handleDownloadFile(file.id, file.original_name)}
                                  className="text-green-600 hover:text-green-700 p-1 rounded transition-colors duration-200"
                                  title="Download file"
                                >
                                  <Download className="w-4 h-4" />
                                </button>
                                
                                <button
                                  onClick={() => removeExistingFile(file.id)}
                                  className="text-red-500 hover:text-red-600 p-1 rounded transition-colors duration-200"
                                  title="Remove file"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'add' && (
                <div className="space-y-6">
                  {/* File upload area */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 hover:border-green-400 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:bg-green-50/50"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      Add more files to this library
                    </p>
                    <p className="text-gray-600">
                      Click to browse or drag and drop files here
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                  />

                  {/* New files list */}
                  {newFiles.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">
                        Files to add ({newFiles.length})
                      </h4>
                      
                      <div className="space-y-2">
                        {newFiles.map((fileItem) => {
                          const FileIcon = getFileIcon(fileItem.type);
                          return (
                            <div
                              key={fileItem.id}
                              className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl"
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
                                onClick={() => removeNewFile(fileItem.id)}
                                className="text-red-500 hover:text-red-600 p-1 transition-colors duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setNewFiles([])}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium transition-colors duration-200"
                        >
                          Clear All
                        </button>
                        
                        <button
                          onClick={handleAddFiles}
                          disabled={isAddingFiles}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-medium transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isAddingFiles ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              />
                              Adding...
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              Add Files
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {showDeleteConfirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Delete Library
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      Are you sure you want to delete "<span className="font-semibold">{library.name}</span>"? 
                      This action cannot be undone and will permanently delete all files.
                    </p>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        disabled={isDeleting}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium transition-colors duration-200 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      
                      <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-medium transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isDeleting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}