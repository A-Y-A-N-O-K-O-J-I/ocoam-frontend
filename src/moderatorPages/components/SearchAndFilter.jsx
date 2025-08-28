import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter,
  X,
  ChevronDown,
  SortAsc,
  Calendar,
  FileText,
  Type
} from 'lucide-react';

export default function SearchAndFilter({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange,
  resultCount 
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const sortOptions = [
    {
      value: 'newest',
      label: 'Newest First',
      icon: Calendar,
      description: 'Recently created libraries'
    },
    {
      value: 'oldest',
      label: 'Oldest First',
      icon: Calendar,
      description: 'Older libraries first'
    },
    {
      value: 'name',
      label: 'Alphabetical',
      icon: Type,
      description: 'Sort by library name'
    },
    {
      value: 'files',
      label: 'Most Files',
      icon: FileText,
      description: 'Libraries with most files'
    }
  ];

  const clearSearch = () => {
    onSearchChange('');
  };

  const getCurrentSortLabel = () => {
    const currentSort = sortOptions.find(option => option.value === sortBy);
    return currentSort ? currentSort.label : 'Sort by';
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <motion.div
          animate={{
            boxShadow: isFocused 
              ? '0 0 0 3px rgb(34 197 94 / 0.1)' 
              : '0 1px 3px rgb(0 0 0 / 0.1)'
          }}
          className={`relative bg-white rounded-2xl border transition-all duration-300 ${
            isFocused 
              ? 'border-green-300' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Search className={`w-5 h-5 transition-colors duration-300 ${
              isFocused ? 'text-green-500' : 'text-gray-400'
            }`} />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search libraries by name or description..."
            className="w-full pl-12 pr-12 py-4 bg-transparent rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none text-sm"
          />

          {/* Clear Button */}
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Search Results Count */}
        <AnimatePresence>
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 left-0 text-sm text-gray-600"
            >
              {resultCount === 0 ? (
                <span className="text-red-500">No libraries found</span>
              ) : (
                <span>
                  Found <span className="font-semibold text-green-600">{resultCount}</span> {resultCount === 1 ? 'library' : 'libraries'}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-white border border-gray-200 hover:border-gray-300 rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <SortAsc className="w-4 h-4" />
              <span>{getCurrentSortLabel()}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                isFilterOpen ? 'rotate-180' : ''
              }`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isFilterOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsFilterOpen(false)}
                  />

                  {/* Dropdown Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 min-w-[240px] z-20"
                  >
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                      Sort Options
                    </div>
                    
                    {sortOptions.map((option) => {
                      const IconComponent = option.icon;
                      const isSelected = sortBy === option.value;
                      
                      return (
                        <button
                          key={option.value}
                          onClick={() => {
                            onSortChange(option.value);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                            isSelected ? 'bg-green-50 text-green-700' : 'text-gray-700'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${
                            isSelected 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              {option.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {option.description}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Active Sort Indicator */}
          <AnimatePresence>
            {sortBy !== 'newest' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                Sorted by {getCurrentSortLabel()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Summary */}
        <div className="text-sm text-gray-600">
          {resultCount} {resultCount === 1 ? 'library' : 'libraries'}
        </div>
      </div>

      {/* Search Query Display */}
      <AnimatePresence>
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 text-blue-700">
              <Search className="w-4 h-4" />
              <span className="text-sm">
                Searching for: <span className="font-semibold">"{searchQuery}"</span>
              </span>
            </div>
            <button
              onClick={clearSearch}
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}