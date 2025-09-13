import React from "react";
import { Link } from "react-router-dom";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 

export default function Navbar({ShowMenu=true}) {
  return (
    <nav
      className="fixed top-0 left-1/2 -translate-x-1/2 z-50
                  mx-auto w-[100%] 
                 bg-gray-900/40 backdrop-blur-md
                 px-6 py-3 flex justify-between items-center 
                 text-white shadow-md "
    >
      {/* Logo + Nom */}
      <Link to="/" className="flex items-center gap-2 text-lg font-bold">
        <span className="tracking-wide">ToonTime</span>
      </Link>

      {/* Menu principal */}
      {ShowMenu && ( 
      <div className="hidden md:flex space-x-6 text-sm font-medium">
        <a href="#nav" className="hover:text-blue-600 transition">Accueil</a>
        <a href="#vision" className="hover:text-blue-600 transition">Notre vision</a>
        <a href="#categories" className="hover:text-blue-600 transition">Catégories</a>
        <a href="#about" className="hover:text-blue-600 transition">À propos</a>
        <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
      </div>
      )}

      {/* Icônes + Langue */}
      <div className="flex items-center space-x-4">

        {/* connect */}
        <Link to="/register" className="bg-black text-white rounded-full px-3 py-1 text-sm font-semibold hover:bg-gray-300 hover:text-black transition">
          S'inscrire
        </Link>
        <Link to="/login" className="bg-white text-black rounded-full  px-3 py-1 text-sm font-semibold hover:bg-gray-300 hover:text-black transition">
          Se connecter
        </Link>
      </div>
    </nav>
  );
}
