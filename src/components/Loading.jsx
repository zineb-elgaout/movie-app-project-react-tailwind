import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  // Animation des bulles
  const bubbleVariants = {
    start: { y: 0 },
    end: { y: -20 },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 m-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 m-3 p-3">
            Chargement...
          </h2>
        </motion.div>

        {/* Animation de chargement */}
        <div className="flex justify-center space-x-2">
          {[...Array(13)].map((_, i) => (
            <motion.div
              key={i}
              variants={bubbleVariants}
              initial="start"
              animate="end"
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.3,
                delay: i * 0.1,
              }}
              className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600"
            />
          ))}
        </div>
        <div className="flex justify-center space-x-2">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              variants={bubbleVariants}
              initial="end"
              animate="start"
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.3,
                delay: i * 0.1,
              }}
              className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600"
            />
          ))}
        </div>

        {/* Message optionnel */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-gray-500 dark:text-gray-400"
        >
          Préparation de votre contenu
        </motion.p>
      </div>
    </div>
  );
};

export default Loading;