
import React, { useState } from 'react';
import Navbar from '../../components/client/Navbar';
import Hero from './components/client/Hero';
import Categories from './components/client/Categories';
import SearchBar from './components/client/SearchBar';
import ContentSections from './components/client/ContentSections';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const heroSlides = [
    {
      id: 1,
      title: "The Last Adventure",
      description: "Join the epic journey across uncharted territories in this blockbuster hit.",
      imageUrl: "https://source.unsplash.com/random/800x450?movie,adventure",
    },
    {
      id: 2,
      title: "Cosmic Odyssey",
      description: "A sci-fi masterpiece exploring the depths of space and human consciousness.",
      imageUrl: "https://source.unsplash.com/random/800x450?movie,sci-fi",
    },
    {
      id: 3,
      title: "Midnight Detective",
      description: "A noir thriller that will keep you guessing until the very end.",
      imageUrl: "https://source.unsplash.com/random/800x450?movie,noir",
    },
  ];

  const categories = [
    { id: 1, title: "Action", description: "High-octane thrills", count: 245 },
    { id: 2, title: "Comedy", description: "Laugh-out-loud fun", count: 189 },
    { id: 3, title: "Drama", description: "Emotional journeys", count: 312 },
    { id: 4, title: "Sci-Fi", description: "Futuristic adventures", count: 178 },
    { id: 5, title: "Horror", description: "Chilling stories", count: 134 },
    { id: 6, title: "Documentary", description: "Real-life stories", count: 97 },
  ];

  const favoriteCategories = ["Action", "Sci-Fi", "Thriller"];
  const favoriteMovies = [
    { id: 1, title: "The Last Adventure", category: "Action" },
    { id: 2, title: "Cosmic Odyssey", category: "Sci-Fi" },
    { id: 3, title: "Midnight Detective", category: "Thriller" },
    { id: 4, title: "Ocean's Depth", category: "Adventure" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Hero slides={heroSlides} />
      <div className="bg-black py-8 px-4 sm:px-6 lg:px-8">
        <Categories categories={categories} />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ContentSections 
          favoriteCategories={favoriteCategories} 
          favoriteMovies={favoriteMovies} 
        />
      </div>
    </div>
  );
};

export default LandingPage;