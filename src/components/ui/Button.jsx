
import React from 'react';
import { motion } from 'framer-motion';

export default function Button({
  children,
  onClick,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      type={type}
      className={`bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-full transition-all shadow-lg ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
