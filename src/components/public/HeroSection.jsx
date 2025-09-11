import { FaXTwitter } from "react-icons/fa6"; 
import React, { useState, useEffect } from 'react';
import { 
  ArrowRightIcon, 
  PlayIcon, 
  SunIcon, 
  MoonIcon,
  EnvelopeIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon
} from 'lucide-react';
import { FaUser, FaUserAlt, FaUserAltSlash } from 'react-icons/fa';

const HeroSection = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "The Last Adventure",
      description: "Embark on a breathtaking journey through uncharted lands filled with magic, mystery, and unforgettable characters.",
      imageUrl: "https://lh4.googleusercontent.com/-kearrbyvllI/T-8EgNgs-yI/AAAAAAAAMhs/G8dTzElqenY/s1600/Disney-Pixar-Brave-Wallpaper.jpg",
      brandImageUrl: "https://m.media-amazon.com/images/I/51H20lDxdoL.jpg",
      keywords: "comédie, Pixar, Disney, 1999, film, animation",
    },
    {
      title: "Cosmic Odyssey",
      description: "Dive deep into the vastness of space in this visually stunning sci-fi epic. Exploring themes of human consciousness and the nature of existence.",
      brandImageUrl: "https://1.bp.blogspot.com/-PSTGS9T0ZQE/XZ1T-E1WPpI/AAAAAAACdiQ/jJ8FfR1yzbAbHPDJjLzwAwaw2lcc9RRIwCLcBGAsYHQ/s1600/unnamed%2B%25285%2529.jpg",
      keywords: "science-fiction, odyssée, espace, exploration, aventure, thriller",
      imageUrl: "https://wallpaper-house.com/data/out/5/wallpaper2you_66968.jpg",
    },
    {
      title: "Midnight Detective",
      description: "Step into the dark and moody world of a relentless detective unraveling a web of lies, betrayal, and secrets.",
      brandImageUrl: "https://lumiere-a.akamaihd.net/v1/images/p_encanto_homeent_22359_4892ae1c.jpeg",
      keywords: "noir, thriller, enquête, mystère, suspense, crime",
      imageUrl: "https://s.abcnews.com/images/GMA/Encanto-ht-er-210909_1631228363870_hpMain_16x9_992.jpg",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'}`}>
      
      {/* Navigation avec mode sombre/clair */}
      <div className="flex justify-end p-8">
        
      </div>

      {/* Hero Section Centrée */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="flex flex-col items-center text-center space-y-10">
          
          {/* Titre principal avec taille ajustée */}
          <div className="space-y-6 max-w-3xl">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Bienvenue sur {' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-200">
                ToonTime
              </span>
            </h1>
            
            <p className={`text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Découvrez un monde d'animation et de divertissement sans limites. 
              Des classiques intemporels aux dernières nouveautés, tout est à portée de main.
            </p>
          </div>
          
          {/* Boutons d'action */}
          <div className="flex flex-wrap justify-center gap-4">
            <button className={`flex items-center space-x-2 px-6 py-3 rounded-lg ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-indigo-500 hover:bg-indigo-600'} text-white font-medium transition-colors shadow-md`}>
              <span>Commencer maintenant</span>
              <ArrowRightIcon className="h-5 w-5" />
            </button>
            
            <button className={`flex items-center space-x-2 px-6 py-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-white' : 'text-gray-800'} font-medium transition-colors shadow-md`}>
              <FaUser className="h-5 w-5" />
              <span>Continuer autant qu'invité</span>
            </button>
          </div>
          
          {/* Icônes des réseaux sociaux */}
          <div className="flex space-x-5 pt-4">
            <a href="#" className={`p-3 rounded-full ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-blue-500 hover:bg-gray-100'} shadow-md transition-colors`}>
              <FacebookIcon size={24} />
            </a>
            <a href="#" className={`p-3 rounded-full ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-blue-400 hover:bg-gray-100'} shadow-md transition-colors`}>
              <FaXTwitter size={24} />
            </a>
            <a href="#" className={`p-3 rounded-full ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-pink-500 hover:bg-gray-100'} shadow-md transition-colors`}>
              <InstagramIcon size={24} />
            </a>
            <a href="#" className={`p-3 rounded-full ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-red-500 hover:bg-gray-100'} shadow-md transition-colors`}>
              <YoutubeIcon size={24} />
            </a>
            
          </div>
          
          
        </div>
          
        {/* Image Slider */}
        <div className="relative mt-16 max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0 relative">
                  <img 
                    src={slide.imageUrl} 
                    alt={slide.title}
                    className="w-full h-80 md:h-96 object-cover"
                  />
                  <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t ${darkMode ? 'from-gray-900' : 'from-black'} to-transparent`}>
                    <h3 className="text-white text-xl font-semibold">{slide.title}</h3>
                    <p className="text-gray-200 text-sm mt-1">{slide.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Slider Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${currentSlide === index ? (darkMode ? 'bg-indigo-500' : 'bg-indigo-600') : (darkMode ? 'bg-gray-600' : 'bg-gray-300')}`}
              />
            ))}
          </div>
          
          
        </div>
      </div>

      
    </div>
  );
};





export default HeroSection;