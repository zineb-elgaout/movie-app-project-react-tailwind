import React from "react";
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <nav
      id="nav"
      className=" top-0 left-0 w-full z-50 
                 bg-white/5  
                 px-6 py-4 flex justify-between items-center 
                 text-white"
    >
      {/* Logo */}
      <div className="flex items-center text-3xl font-extrabold tracking-wide text-indigo-100  px-3">
        <span>ToonTime</span>
      </div>

      {/* Menu desktop */}
      <div className="hidden md:flex space-x-8 text-md font-medium">
        <a href="#nav" className="hover:text-blue-400 transition">Accueil</a>
        <a href="#vision" className="hover:text-blue-400 transition">Notre vision</a>
        <a href="#categories" className="hover:text-blue-400 transition">Catégories</a>
        <a href="#about" className="hover:text-blue-400 transition">À propos</a>
      </div>

      {/* Button */}
      <Link to="/login" 
            className="hidden md:flex
                        bg-indigo-500 hover:bg-indigo-400 
                        text-white 
                        px-6 py-2 
                        text-sm md:text-base 
                        rounded-full 
                        transition-all
                      "
                      >
        Se connecter
      </Link>
    </nav>
  );
}