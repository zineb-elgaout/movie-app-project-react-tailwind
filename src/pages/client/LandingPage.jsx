
import React, { useState } from 'react';
import Navbar from '../../components/client/NavBar';
import Hero from '../../components/client/Hero';
import Categories from '../../components/client/Categories';
import SearchBar from '../../components/client/SearchBar';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
const heroSlides = [
  {
    id: 1,
    title: "The Last Adventure",
    description: "Embark on a breathtaking journey through uncharted lands filled with magic, mystery, and unforgettable characters. This Disney-Pixar masterpiece combines heartwarming storytelling with stunning animation to create a cinematic experience for all ages.",
    imageUrl: "https://lh4.googleusercontent.com/-kearrbyvllI/T-8EgNgs-yI/AAAAAAAAMhs/G8dTzElqenY/s1600/Disney-Pixar-Brave-Wallpaper.jpg",
    brandImageUrl:"https://m.media-amazon.com/images/I/51H20lDxdoL.jpg",
    keywords:"comédie, Pixar, Disney, 1999, film, animation",
  },
  {
    id: 2,
    title: "Cosmic Odyssey",
    description: "Dive deep into the vastness of space in this visually stunning sci-fi epic. Exploring themes of human consciousness, the nature of existence, and the unknown, 'Cosmic Odyssey' challenges the mind while thrilling audiences with breathtaking visuals and an unforgettable soundtrack.",
    brandImageUrl:"https://1.bp.blogspot.com/-PSTGS9T0ZQE/XZ1T-E1WPpI/AAAAAAACdiQ/jJ8FfR1yzbAbHPDJjLzwAwaw2lcc9RRIwCLcBGAsYHQ/s1600/unnamed%2B%25285%2529.jpg",
    keywords:"science-fiction, odyssée, espace, exploration, aventure, thriller",
    imageUrl: "https://wallpaper-house.com/data/out/5/wallpaper2you_66968.jpg",
  },
  {
    id: 3,
    title: "Midnight Detective",
    description: "Step into the dark and moody world of a relentless detective unraveling a web of lies, betrayal, and secrets. With noir aesthetics, gripping suspense, and complex characters, 'Midnight Detective' keeps you on the edge of your seat until the final revelation.",
    brandImageUrl:"https://th.bing.com/th/id/R.de76b6582fefcb8ff7e052369493522c?rik=k9lg8YJma7m31g&riu=http%3a%2f%2fwww.impawards.com%2f2017%2fposters%2fcoco_ver6_xlg.jpg&ehk=vbs5NaOW6RLVJ82ruLLB2nmKdTyikPF7RuUhdlm5HvU%3d&risl=&pid=ImgRaw&r=0",
    keywords:"noir, thriller, enquête, mystère, suspense, crime",
    imageUrl: "https://d18ufwot1963hr.cloudfront.net/wp-content-production/uploads/2024/11/hero.jpg",
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


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Hero slides={heroSlides} />
      <div className="bg-black py-8 px-4 sm:px-6 lg:px-8">
        <Categories categories={categories} />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
      </div>
    </div>
  );
};

export default LandingPage;