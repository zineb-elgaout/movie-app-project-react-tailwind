import React, { useState, useEffect } from 'react';

const Hero = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Image de fond */}
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Effet foncé */}
          <div className="absolute inset-0 bg-black bg-opacity-80"></div>

          {/* Contenu centré */}
          <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 max-w-7xl w-full text-white">

              {/* Texte + mots-clés */}
              <div className="flex flex-col justify-center space-y-6">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
                  {slide.title}
                </h2>
                <p className="text-base sm:text-lg lg:text-xl font-light max-w-lg">

                  {slide.description}
                </p>

                {/* Mots-clés */}
                {slide.keywords && slide.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-6">
                    {slide.keywords.split(",").map((keyword, i) => (
                      <span
                        key={i}
                        className="bg-black bg-opacity-50 text-white px-5 py-2 rounded-full text-base"
                      >
                        {keyword.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Boutons */}
                <div className="flex space-x-5">
                  <button className="bg-purple-600 hover:bg-purple-900 text-white px-7 py-3 rounded-lg font-semibold flex items-center text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Watch Now
                  </button>
                  <button className="bg-white bg-opacity-30 hover:bg-opacity-20 text-white px-7 py-3 rounded-lg font-semibold flex items-center text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    More Info
                  </button>
                  
                </div>
              </div>

             {/* Image de Brand (double carte avec effet hiérarchique) */}
            <div className="hidden md:flex items-end justify-end relative max-w-[400px]">
              {/* Image en arrière-plan */}
              <div className="absolute top-[-20px] right-[-20px] rotate-[-25deg] scale-95 z-0">
                <img
                  src={slide.brandImageUrl}
                  alt="Brand background"
                  className="rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.8)] w-full h-auto max-h-[600px] object-cover opacity-60"
                />
                {/* Overlay plus dark */}
                <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg pointer-events-none"></div>
              </div>

              {/* Image principale */}
              <div className="relative z-10 rotate-[16deg]">
                <img
                  src={slide.brandImageUrl}
                  alt="Brand"
                  className="rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.9)] w-full h-auto max-h-[600px] object-cover"
                />
                {/* Overlay moins dark */}
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg pointer-events-none"></div>
              </div>
            </div>

            </div>
          </div>
        </div>
      ))}

      {/* Indicateurs */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-purple-500' : 'bg-white bg-opacity-50'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
