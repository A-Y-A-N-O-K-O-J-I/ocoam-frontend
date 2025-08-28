import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Plus, 
  Search,
  FileText,
  FolderOpen,
  Upload
} from 'lucide-react';

export default function EmptyState({ searchQuery, onCreateClick, hasLibraries = false }) {
  const isSearchEmpty = searchQuery && hasLibraries;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      {isSearchEmpty ? (
        /* Search No Results */
        <>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mb-6 shadow-lg"
          >
            <Search className="w-12 h-12 text-blue-600" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 mb-3"
          >
            No libraries found
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8 max-w-md leading-relaxed"
          >
            We couldn't find any libraries matching "<span className="font-semibold text-blue-600">{searchQuery}</span>". 
            Try adjusting your search terms or browse all libraries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors duration-300"
            >
              Clear Search
            </button>
            <button
              onClick={onCreateClick}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Create New Library
            </button>
          </motion.div>
        </>
      ) : (
        /* No Libraries at All */
        <>
          {/* Animated illustration */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative mb-8"
          >
            {/* Main container */}
            <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-200 rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-2 right-2 w-8 h-8 bg-white/40 rounded-full"></div>
                <div className="absolute bottom-3 left-3 w-6 h-6 bg-white/30 rounded-full"></div>
                <div className="absolute top-1/2 left-1 w-4 h-4 bg-white/20 rounded-full"></div>
              </div>

              {/* Main icon */}
              <motion.div
                animate={{ 
                  rotateY: [0, 10, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <BookOpen className="w-16 h-16 text-green-600" />
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Plus className="w-4 h-4 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -bottom-1 -left-1 w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center shadow-lg"
              >
                <FileText className="w-3 h-3 text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Your Library Awaits
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8 max-w-lg leading-relaxed text-lg"
          >
            Create your first library to organize and share educational resources. 
            Upload documents, PDFs, images, and more to build your knowledge collection.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCreateClick}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 text-lg"
            >
              <Plus className="w-5 h-5" />
              Create Your First Library
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border-2 border-gray-200 hover:border-green-300 text-gray-700 hover:text-green-700 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 text-lg shadow-sm hover:shadow-md"
            >
              <FolderOpen className="w-5 h-5" />
              Browse Examples
            </motion.button>
          </motion.div>

          {/* Quick tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl"
          >
            {[
              {
                icon: Upload,
                title: "Easy Upload",
                description: "Drag and drop multiple files at once"
              },
              {
                icon: FolderOpen,
                title: "Smart Organization",
                description: "Group related resources together"
              },
              {
                icon: Search,
                title: "Quick Access",
                description: "Find what you need instantly"
              }
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <tip.icon className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </motion.div>
  );
}