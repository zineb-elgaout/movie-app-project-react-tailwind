import React from "react";
import { Link } from 'react-router-dom';
import { FiLogIn } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav
      id="nav"
      className="top-0 left-0 w-full z-50 
                 bg-black/10 backdrop-blur-sm
                 px-4 py-2 flex justify-between items-center 
                 text-white"
    >
      {/* Logo */}
      <div className="flex items-center text-xl font-extrabold tracking-wide text-indigo-100 px-2">
        <span>ToonTime</span>
      </div>

      {/* Menu desktop */}
      <div className="hidden md:flex space-x-6 text-sm font-medium">
        <a href="#nav" className="hover:text-blue-400 transition">Accueil</a>
        <a href="#vision" className="hover:text-blue-400 transition">Notre vision</a>
        <a href="#categories" className="hover:text-blue-400 transition">Catégories</a>
        <a href="#about" className="hover:text-blue-400 transition">À propos</a>
        <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
      </div>

      <div className="flex space-x-2">
        {/* Button */}
        <Link to="/register" 
              className="hidden md:flex justify-center items-center
                         shadow-lg overflow-hidden backdrop-blur-sm
                         border border-white/50
                         text-black bg-white/90 
                         hover:bg-gray-200
                         px-3 py-1 
                         text-xs md:text-sm 
                         rounded-full 
                         transition-all"
        >
          S'inscrire
        </Link>
        <Link to="/login" 
              className="hidden md:flex justify-center items-center
                         shadow-lg overflow-hidden backdrop-blur-sm
                         border border-white/50
                         text-white 
                         hover:bg-white/20
                         px-3 py-1 
                         text-xs md:text-sm 
                         rounded-full 
                         transition-all"
        >
          Se connecter
        </Link>
      </div>
    </nav>
  );
}