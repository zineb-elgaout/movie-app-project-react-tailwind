import React from 'react';
import { Link } from 'react-router-dom';
import { FaBackspace, FaBackward, FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://backiee.com/static/wallpapers/5120x2880/393582.jpg" 
          alt="notfound"
          className="object-cover w-full h-full"
        />
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white p-8 border border-white border-opacity-20 rounded-lg shadow-lg">
        <h1 className="text-9xl font-bold mb-4 text-white drop-shadow-md">404</h1>
        <h2 className="text-5xl font-semibold mb-6">Oups ! Page non trouvée</h2>
        <p className="text-xl max-w-md mb-10 opacity-90">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <Link to="/">
          <button className="flex items-center justify-center gap-2 bg-white bg-opacity-20 backdrop-blur-md text-white px-6 py-3 rounded-lg border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300 shadow-lg">
            <FaBackward className="text-lg" />
            <span>Retour à l'accueil</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;