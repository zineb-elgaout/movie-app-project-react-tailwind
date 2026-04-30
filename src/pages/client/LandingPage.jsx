import React, { useState, useEffect } from 'react';
import NavBar from '../../Layouts/client/NavBar';
import Hero from '../../components/client/Hero';
import Categories from '../../components/client/Categories';
import SearchBar from '../../components/client/SearchBar';
import Cartoons from '../../components/client/Cartoons';
import { getAllCategories } from '../../../services/categoryService';
import { getAllCartoons } from '../../../services/cartoonService';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [cartoons, setCartoons] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);

  // Récupération des catégories
  useEffect(() => {
    getAllCategories()
      .then(res => setCategories(res.data))
      .catch(err => console.error("Erreur récupération catégories", err));
  }, []);

  // Récupération des cartoons
  useEffect(() => {
    getAllCartoons()
      .then(res => {
        setCartoons(res.data);
        // Utiliser les 4 premiers cartoons pour le Hero
        setHeroSlides(res.data.slice(0, 4));
      })
      .catch(err => console.error("Erreur chargement cartoons", err));
  }, []);

  const renderSectionHeader = (title) => (
    <div className="text-start my-8">
      <span className="text-white text-2xl font-medium mt-2">{title}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      
      {/* Hero dynamique */}
      <Hero slides={heroSlides} />

      <div className="bg-black py-8 px-4 sm:px-6 lg:px-8">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <Categories categories={categories} />
        
        {renderSectionHeader('Films et séries')}
        
        <Cartoons cartoons={cartoons} />
      </div>
    </div>
  );
};

export default LandingPage;
