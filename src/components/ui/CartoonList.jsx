import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CartoonList = () => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <motion.div 
      className="relative w-72 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background Glassmorphism Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-2xl m-4"></div>
      
      {/* Card Content */}
      <div className="relative z-10 h-full flex flex-col ">
        {/* Clickable Image with Parallax Effect */}
        <motion.div 
          className="relative h-56 overflow-hidden cursor-pointer"
          onClick={toggleExpand}
          animate={{
            scale: isHovered ? 1.03 : 1
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img 
            className="w-full h-full object-cover"
            src={image_url} 
            alt={title}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 font-bold px-3 py-1 rounded-full text-xs flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {rating}
          </div>
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h2 className="text-white font-bold text-xl drop-shadow-md">{title}</h2>
            <p className="text-white/80 text-sm">{release_year}</p>
          </div>
        </motion.div>

        {/* Card Body */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-5 flex-1 flex flex-col">
          {/* Collapsed Info */}
          {!expanded && (
            <div className="flex-1">
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-3">
                {description}
              </p>
              <motion.button 
                onClick={toggleExpand}
                className="text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Voir détails
              </motion.button>
            </div>
          )}

          {/* Expanded Info */}
          <AnimatePresence>
            {expanded && (
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{duration} minutes</span>
                  </div>
                  <div className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span><span className="font-medium">Personnage principal:</span> {main_character}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {description}
                  </p>
                </div>
                <motion.button 
                  onClick={toggleExpand}
                  className="mt-4 text-sm font-medium text-purple-500 hover:text-purple-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Voir moins
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <motion.button 
              onClick={() => onEdit(id)}
              className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-sm"
              whileHover={{ scale: 1.1, backgroundColor: '#3B82F6' }}
              whileTap={{ scale: 0.95 }}
              aria-label="Modifier"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </motion.button>
            <motion.button 
              onClick={() => onDelete(id)}
              className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-sm"
              whileHover={{ scale: 1.1, backgroundColor: '#EF4444' }}
              whileTap={{ scale: 0.95 }}
              aria-label="Supprimer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartoonList;