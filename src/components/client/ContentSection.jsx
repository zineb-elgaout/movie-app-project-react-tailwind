// components/ContentSections.js
import React from 'react';

const ContentSections = ({ favoriteCategories, favoriteMovies }) => {
  return (
    <div className="space-y-10">
      {/* Favorite Categories Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Favorite Categories</h2>
          <button className="text-gray-400 hover:text-white text-sm">See All</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favoriteCategories.map((category, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition cursor-pointer">
              <h3 className="font-semibold">{category}</h3>
              <p className="text-gray-400 text-sm mt-1">Popular titles</p>
            </div>
          ))}
        </div>
      </section>

      {/* Favorite Movies Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Favorite Movies</h2>
          <button className="text-gray-400 hover:text-white text-sm">See All</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favoriteMovies.map((movie) => (
            <div key={movie.id} className="group">
              <div className="aspect-w-2 aspect-h-3 bg-gray-800 rounded-lg overflow-hidden relative">
                <img
                  src={`https://source.unsplash.com/random/300x450?movie,${movie.title}`}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:opacity-70 transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-semibold">{movie.title}</h3>
                  <p className="text-gray-400 text-sm">{movie.category}</p>
                </div>
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Watch All Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Watch All</h2>
          <button className="text-gray-400 hover:text-white text-sm">See All</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="group">
              <div className="aspect-w-2 aspect-h-3 bg-gray-800 rounded-lg overflow-hidden relative">
                <img
                  src={`https://source.unsplash.com/random/300x450?movie,${index}`}
                  alt={`Movie ${index}`}
                  className="w-full h-full object-cover group-hover:opacity-70 transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-semibold">Movie Title {index + 1}</h3>
                  <p className="text-gray-400 text-sm">Action, Adventure</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContentSections;