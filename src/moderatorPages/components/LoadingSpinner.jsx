import { motion } from 'framer-motion';
import { BookOpen, Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        {/* Animated Icon */}
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <BookOpen className="w-8 h-8 text-white" />
          </motion.div>

          {/* Rotating border */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 w-16 h-16 mx-auto border-4 border-green-200 border-t-green-500 rounded-2xl"
          />
        </div>

        {/* Loading text with typewriter effect */}
        <div className="space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gray-900"
          >
            Loading Libraries
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600"
          >
            Fetching your educational resources...
          </motion.p>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center items-center space-x-1 mt-6">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2
              }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
          ))}
        </div>

        {/* Progress indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mt-8 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full max-w-xs mx-auto"
        />

        {/* Alternative compact loading for smaller areas */}
        <style jsx>{`
          @media (max-height: 500px) {
            .compact-loading {
              padding: 2rem;
            }
            
            .compact-loading .loading-icon {
              width: 3rem;
              height: 3rem;
            }
            
            .compact-loading .loading-title {
              font-size: 1.25rem;
            }
          }
        `}</style>
      </motion.div>
    </div>
  );
}

// Compact version for use in smaller containers
export function CompactLoadingSpinner({ message = "Loading..." }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-8 h-8 border-3 border-green-200 border-t-green-600 rounded-full mb-3"
      />
      <p className="text-gray-600 text-sm">{message}</p>
    </motion.div>
  );
}