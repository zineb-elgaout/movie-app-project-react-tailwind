
import React from "react";
import { motion } from "framer-motion";
import { RiMovie2Line } from 'react-icons/ri';

import { ViewfinderCircleIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav id="nav" className="flex justify-between items-center p-6 max-w-6xl mx-auto ">
      
        <div className="flex items-center text-3xl font-extrabold text-pink-500 tracking-wide">
          <RiMovie2Line className="text-4xl mr-2" /><span>ToonTime</span>
        </div>

        <div className="hidden md:flex space-x-8 text-md font-medium  ">
          <a href="#nav" className="text-gray-700 hover:text-pink-500 transition">Accueil</a>
          <a href="#vision" className="text-gray-700 hover:text-pink-500 transition">Notre vision</a>
          <a href="#categories" className="text-gray-700 hover:text-pink-500 transition">Catégories</a>
          <a href="#about" className="text-gray-700 hover:text-pink-500 transition">À propos</a>
        </div>
        <button className="hidden md:flex
                        bg-pink-500 text-white 
                        px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 
                        text-sm sm:text-base md:text-lg
                        rounded-full 
                        hover:bg-pink-600  
                        transition-all
                        whitespace-nowrap
                        min-w-[120px] sm:min-w-[140px] md:min-w-[160px]
                      ">
          Se connecter
       </button>
      </nav>
  );
}
