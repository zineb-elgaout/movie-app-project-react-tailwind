import {motion} from 'framer-motion';
import React from 'react';

const SectionHeader = ({ header,title, subtitle }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-start mb-12"
  >
    <div className="inline-flex items-center mb-4">
      <div className="w-12 h-px bg-gradient-to-r from-pink-500 to-purple-500 mr-4" />
      <span className="text-sm font-medium tracking-widest text-pink-400 uppercase">
        {header}
      </span>
    </div>
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
      <span className={`bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600`}>
        {title}
      </span>
    </h2>
    <p className="text-lg text-gray-400 max-w-2xl">
      {subtitle}
    </p>
  </motion.div>
);
export default SectionHeader;