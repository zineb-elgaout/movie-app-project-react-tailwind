import React from 'react';
import { motion } from 'framer-motion';
import disney from '../../../assets/public/images/category.png';

const HeroSection = () => {
  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={disney}
          alt="Background admin"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay sombre sur la moitié inférieure */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-900 to-transparent"></div>

      {/* Contenu positionné dans la zone sombre */}
      <div className="relative h-full flex flex-col justify-end items-center text-center pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl"
        >
          {/* Titre principal */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 mb-4">
            Gestion des Catégories
          </h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto"
          >
            Organisez vos contenus par univers et studios d'animation
          </motion.p>

          {/* Ligne décorative animée */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '70vh' }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-8 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

