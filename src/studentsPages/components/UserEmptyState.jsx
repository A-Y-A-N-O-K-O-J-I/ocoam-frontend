import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search,
  FileText,
  FolderOpen,
  RefreshCw
} from 'lucide-react';

export default function UserEmptyState({ searchQuery, hasLibraries = false }) {
  const isSearchEmpty = searchQuery && hasLibraries;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      {isSearchEmpty ? (
        <>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-3xl flex items-center justify-center mb-6 shadow-lg"
          >
            <Search className="w-12 h-12 text-blue-600" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 mb-3"
          >
            No resources found
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8 max-w-md leading-relaxed"
          >
            We couldn't find any libraries matching "<span className="font-semibold text-blue-600">{searchQuery}</span>". 
            Try adjusting your search terms or browse all available resources.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors duration-300 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Clear Search
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <FolderOpen className="w-4 h-4" />
              Browse All Resources
            </button>
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative mb-8"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-2 right-2 w-8 h-8 bg-white/40 rounded-full"></div>
                <div className="absolute bottom-3 left-3 w-6 h-6 bg-white/30 rounded-full"></div>
                <div className="absolute top-1/2 left-1 w-4 h-4 bg-white/20 rounded-full"></div>
              </div>

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
                <BookOpen className="w-16 h-16 text-blue-600" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg"
              >
                <FileText className="w-4 h-4 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -bottom-1 -left-1 w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg"
              >
                <Search className="w-3 h-3 text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            No Resources Available
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8 max-w-lg leading-relaxed text-lg"
          >
            There are currently no educational resources available in the library. 
            Check back later or contact your moderator to add learning materials.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 text-lg"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh Page
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl"
          >
            {[
              {
                icon: BookOpen,
                title: "Educational Content",
                description: "Access PDFs, documents, and study materials"
              },
              {
                icon: Search,
                title: "Easy Discovery",
                description: "Find resources quickly with smart search"
              }
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <tip.icon className="w-6 h-6 text-blue-600" />
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