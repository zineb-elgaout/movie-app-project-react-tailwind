import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {  FiSettings, FiLogOut } from 'react-icons/fi';
import { RiMovie2Line } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

const Topbar = ({ sidebarCollapsed }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const nom = 'elgaout';
  const prenom = 'zineb';

  return (
    <div 
      className={`h-16 border-b border-gray-900 flex items-center justify-between transition-all duration-300 m-1 ${
        sidebarCollapsed ? 'ml-0' : 'ml-0'
      } bg-gray-900 px-8`}  
    >
      {/* Logo ToonTime à gauche */}
      <div className="flex items-center">
        <RiMovie2Line className="text-2xl text-white mr-3" />
        <h1 className="text-xl font-bold text-white">
          ToonTime
        </h1>
      </div>

      {/* Section droite avec nom utilisateur */}
      <div className="flex items-center space-x-4">
        
        {/* Menu utilisateur */}
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-2"
          >
            <div className="flex items-center space-x-2">
              {!sidebarCollapsed && (
                <span className="text-gray-300 font-medium hidden md:inline-block">
                  {prenom} {nom}
                </span>
              )}
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 flex items-center justify-center border border-purple-500/30">
                <span className="text-gray-200 font-medium">
                  {prenom.charAt(0)}{nom.charAt(0)}
                </span>
              </div>
            </div>
          </button>

          {/* Menu déroulant */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-md shadow-lg z-50 border border-gray-700"
              >
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm font-medium text-white">{prenom} {nom}</p>
                  <p className="text-xs text-gray-400">admin@toontime.com</p>
                </div>
                <NavLink 
                  to="/settings" 
                  className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiSettings className="mr-2" />
                  Paramètres
                </NavLink>
                <NavLink 
                  to="/logout" 
                  className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiLogOut className="mr-2" />
                  <span>Déconnexion</span>
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Topbar;