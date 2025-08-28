import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  Filter,
  Grid3X3,
  List,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import UserLibraryGrid from './components/UserLibraryGrid';
import UserLibraryList from './components/UserLibraryList';
import UserLibraryDetailsModal from './components/UserLibraryDetailsModal';
import UserSearchAndFilter from './components/UserSearchAndFilter';
import UserLoadingSpinner from './components/UserLoadingSpinner';
import UserEmptyState from './components/UserEmptyState';
import ModeratorNavBar from '../components/ModeratorNavbar';
import MobileNavigation from '../components/MobileNavigation';
import UserMobileNavigation from '../components/UserMobileNavigation';

export default function UserLibraryDashboard() {
  const [libraries, setLibraries] = useState([]);
  const [filteredLibraries, setFilteredLibraries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    fetchLibraries();
  }, []);

  useEffect(() => {
    filterAndSortLibraries();
  }, [libraries, searchQuery, sortBy]);

  const fetchLibraries = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const baseURL = import.meta.env.VITE_API_URL
      const response = await fetch(`${baseURL}/library/get-library`,
        {
        method:"GET",
        credentials:"include"
      }
      );
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

    if (searchQuery.trim()) {
      filtered = filtered.filter(library => 
        library.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (library.description && library.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

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

  const handleLibraryClick = (library) => {
    setSelectedLibrary(library);
    setIsDetailsModalOpen(true);
  };

  const handleRefresh = () => {
    fetchLibraries();
  };

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
    return <UserLoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-red-200 max-w-md w-full text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
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
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6"
    >
      <UserMobileNavigation/>
      <motion.div variants={headerVariants} className="mb-8 ">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                Library Resources
              </h1>
              <p className="text-gray-600">
                Explore and download educational materials
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 min-w-[120px]"
            >
              <div className="text-2xl font-bold text-blue-600">{libraries.length}</div>
              <div className="text-sm text-gray-600">Available Libraries</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-indigo-100 min-w-[120px]"
            >
              <div className="text-2xl font-bold text-indigo-600">
                {libraries.reduce((total, lib) => total + (lib.total_files || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Resources</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        variants={headerVariants}
        className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div className="flex-1">
          <UserSearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            resultCount={filteredLibraries.length}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="bg-white text-gray-600 hover:text-blue-600 p-2 rounded-lg shadow-sm border border-gray-200 transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={headerVariants}>
        {filteredLibraries.length === 0 ? (
          <UserEmptyState 
            searchQuery={searchQuery}
            hasLibraries={libraries.length > 0}
          />
        ) : (
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <UserLibraryGrid
                key="grid"
                libraries={filteredLibraries}
                onLibraryClick={handleLibraryClick}
              />
            ) : (
              <UserLibraryList
                key="list"
                libraries={filteredLibraries}
                onLibraryClick={handleLibraryClick}
              />
            )}
          </AnimatePresence>
        )}
      </motion.div>

      <AnimatePresence>
        {isDetailsModalOpen && selectedLibrary && (
          <UserLibraryDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => {
              setIsDetailsModalOpen(false);
              setSelectedLibrary(null);
            }}
            library={selectedLibrary}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}