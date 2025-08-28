import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter,
  Grid3X3,
  List,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import LibraryGrid from './components/LibraryGrid';
import LibraryList from './components/LibraryList';
import CreateLibraryModal from './components/CreateLibraryModal';
import LibraryDetailsModal from './components/LibraryDetailsModal';
import SearchAndFilter from './components/SearchAndFilter';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import MobileNavigation from '../components/MobileNavigation';
export default function LibraryDashboard() {
  // State management
  const [libraries, setLibraries] = useState([]);
  const [filteredLibraries, setFilteredLibraries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'name', 'files'
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const baseURL = import.meta.env.VITE_API_URL
  // Fetch libraries on component mount
  useEffect(() => {
    fetchLibraries();
  }, []);

  // Filter and search libraries whenever dependencies change
  useEffect(() => {
    filterAndSortLibraries();
  }, [libraries, searchQuery, sortBy]);

  const fetchLibraries = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${baseURL}/library/get-library`,{
        credentials:"include"
      });
      const data = await response.json();
      
      if (data.status === 200) {
        setLibraries(data.libraries || []);
      } else {
        throw new Error(data.message || 'Failed to fetch libraries');
      }
    } catch (err) {
      console.error('Error fetching libraries:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortLibraries = () => {
    let filtered = [...libraries];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(library => 
        library.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (library.description && library.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'files':
          return (b.total_files || 0) - (a.total_files || 0);
        default:
          return 0;
      }
    });

    setFilteredLibraries(filtered);
  };

  const handleLibraryCreated = (newLibrary) => {
    setLibraries(prev => [newLibrary, ...prev]);
    setIsCreateModalOpen(false);
  };

  const handleLibraryUpdated = (updatedLibrary) => {
    setLibraries(prev => 
      prev.map(lib => lib.id === updatedLibrary.id ? updatedLibrary : lib)
    );
  };

  const handleLibraryDeleted = (libraryId) => {
    setLibraries(prev => prev.filter(lib => lib.id !== libraryId));
    setIsDetailsModalOpen(false);
    setSelectedLibrary(null);
  };

  const handleLibraryClick = (library) => {
    setSelectedLibrary(library);
    setIsDetailsModalOpen(true);
  };

  const handleRefresh = () => {
    fetchLibraries();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-red-200 max-w-md w-full text-center"
        >
          <MobileNavigation/>

          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }
  
  return (
    <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6"
    >
      <MobileNavigation/>
      {/* Header Section */}
      <motion.div variants={headerVariants} className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Title and Stats */}
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-2xl shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                Library Management
              </h1>
              <p className="text-gray-600">
                Manage your educational resources and files
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-green-100 min-w-[120px]"
            >
              <div className="text-2xl font-bold text-green-600">{libraries.length}</div>
              <div className="text-sm text-gray-600">Total Libraries</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100 min-w-[120px]"
            >
              <div className="text-2xl font-bold text-emerald-600">
                {libraries.reduce((total, lib) => total + (lib.total_files || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Files</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Controls Section */}
      <motion.div 
        variants={headerVariants}
        className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        {/* Left side - Search and Filter */}
        <div className="flex-1">
          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            resultCount={filteredLibraries.length}
          />
        </div>

        {/* Right side - View controls and Create button */}
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'grid'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'list'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Refresh Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="bg-white text-gray-600 hover:text-green-600 p-2 rounded-lg shadow-sm border border-gray-200 transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>

          {/* Create Library Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Library</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={headerVariants}>
        {filteredLibraries.length === 0 ? (
          <EmptyState 
            searchQuery={searchQuery}
            onCreateClick={() => setIsCreateModalOpen(true)}
            hasLibraries={libraries.length > 0}
          />
        ) : (
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <LibraryGrid
                key="grid"
                libraries={filteredLibraries}
                onLibraryClick={handleLibraryClick}
              />
            ) : (
              <LibraryList
                key="list"
                libraries={filteredLibraries}
                onLibraryClick={handleLibraryClick}
              />
            )}
          </AnimatePresence>
        )}
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <CreateLibraryModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onLibraryCreated={handleLibraryCreated}
          />
        )}

        {isDetailsModalOpen && selectedLibrary && (
          <LibraryDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => {
              setIsDetailsModalOpen(false);
              setSelectedLibrary(null);
            }}
            library={selectedLibrary}
            onLibraryUpdated={handleLibraryUpdated}
            onLibraryDeleted={handleLibraryDeleted}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}