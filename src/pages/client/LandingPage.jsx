
import React, { useState } from 'react';
import Navbar from '../../components/client/NavBar';
import Hero from '../../components/client/Hero';
import Categories from '../../components/client/Categories';
import SearchBar from '../../components/client/SearchBar';
import Header from '../../components/ui/Header';

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
    brandImageUrl:"https://lumiere-a.akamaihd.net/v1/images/p_encanto_homeent_22359_4892ae1c.jpeg",
    keywords:"noir, thriller, enquête, mystère, suspense, crime",
    imageUrl: "https://s.abcnews.com/images/GMA/Encanto-ht-er-210909_1631228363870_hpMain_16x9_992.jpg",
  },
  {
    id: 4,
    title: "Midnight Detective",
    description: "Step into the dark and moody world of a relentless detective unraveling a web of lies, betrayal, and secrets. With noir aesthetics, gripping suspense, and complex characters, 'Midnight Detective' keeps you on the edge of your seat until the final revelation.",
    brandImageUrl:"https://tse1.mm.bing.net/th/id/OIP.NDxgFFBrwvjINfMV1vBIhgHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    keywords:"noir, thriller, enquête, mystère, suspense, crime",
    imageUrl: "https://refstatic.sk/movie/ae6b07b0bb6bd7aab8f1.jpg?is=2000x2000&s=a198aeb4d7c7a5769f841b9f0556baca54dfd22161468053be1a9e8eb18c445b",
  },
];

const categories = [
  { id: 1, title: "Disney", description: "Classics and timeless tales", count: 245 },
  { id: 2, title: "Pixar", description: "Heartwarming animated adventures", count: 189 },
  { id: 3, title: "Studio Ghibli", description: "Magical Japanese animations", count: 312 },
  { id: 4, title: "DreamWorks", description: "Fun-filled family entertainment", count: 178 },
  { id: 5, title: "Warner Bros Animation", description: "Iconic and bold creations", count: 134 },
  { id: 6, title: "Illumination", description: "Colorful and humorous stories", count: 97 },
  { id: 7, title: "Nickelodeon", description: "Fun and quirky animated series", count: 88 },
  { id: 8, title: "Sony Pictures Animation", description: "Innovative and unique stories", count: 76 },
  { id: 9, title: "Blue Sky Studios", description: "Charming and adventurous tales", count: 54 },
  { id: 10, title: "Cartoon Network", description: "Creative and entertaining shows", count: 145 },
];


 const renderSectionHeader = (title) => (
    <div className="text-start my-8">
      <span className="text-white text-2xl font-medium mt-2">{title}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Hero slides={heroSlides} />
      
      <div className="bg-black py-8 px-4 sm:px-6 lg:px-8">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        
        <Categories categories={categories} />

        {renderSectionHeader( 'Catégories préferée')}
        
        {renderSectionHeader('Films et seriés préférées')}
        
        {renderSectionHeader('Films et seriés')}
        
      </div>
    </div>
  );
};

export default LandingPage;