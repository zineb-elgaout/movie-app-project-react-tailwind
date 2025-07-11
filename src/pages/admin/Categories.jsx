import React, { useState, useEffect } from "react";
import AdminLayout from "../../Layouts/admin/AdminLayout";
import CategoryList from "../../components/admin/categories/CategorieList";
import Button from "../../components/ui/Button";
import AddCategory from "../../components/admin/categories/AddCategory";
import { getAllCategories } from "../../../services/categoryService";
import CartoonList from "../../components/ui/CartoonList";
import image from "../../assets/public/images/cartoon.jpg";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "../../components/admin/categories/HeroSection";
import Loading from "../../components/Loading";

export default function Categories() {
  // ==================== ÉTATS ====================
  const [showAddForm, setShowAddForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  // ==================== DONNÉES ====================
  const headerData = {
    header: 'Gestion des ',
    title: 'Catégories',
    subtitle: "Organisez vos contenus par univers et studios d'animation."
  };

  const cartoons = [
    {
      id: 1,
      title: "Adventure Time",
      release_year: 2010,
      duration: 11,
      description: "A boy named Finn and his magical dog Jake go on adventures in the post-apocalyptic Land of Ooo.",
      rating: 8.6,
      main_character: "Finn the Human",
      image_url: image
    },
    // ... (autres cartoons)
  ];

  // ==================== EFFETS ====================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des catégories.");
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // ==================== HANDLERS ====================
  const handleEdit = (id) => {
    console.log(`Edit cartoon with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete cartoon with id: ${id}`);
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // ==================== RENDU ====================
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulation de chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (error) return <p className="text-gray-400 text-center py-8">{error}</p>;

  return (
    <AdminLayout>
      {/* ========= hero section ============*/}
      <HeroSection />
      {/* ========= SECTION PRINCIPALE ========= */}
      <section className="relative px-6 py-8">
        <div className="relative max-w-7xl mx-auto">
          {/* Header Principal Moderne */}
          <div className="mb-12 group">
            <div className="flex items-end gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-light text-gray-400 dark:text-gray-200 tracking-tight">
                {headerData.header}
                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 ml-2">
                  {headerData.title}
                </span>
              </h1>
              <div className="h-0.5 flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              {headerData.subtitle}
            </p>
          </div>
          
          <CategoryList />

          <div className="flex justify-start mt-6">
            <Button 
              onClick={() => setShowAddForm(true)} 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-indigo-500/50 transition-all"
            >
              + Ajouter une catégorie
            </Button>
          </div>
          
          {showAddForm && (
            <AddCategory onClose={() => setShowAddForm(false)} />
          )}
        </div>
      </section>

      {/* ========= SECTIONS PAR CATÉGORIE ========= */}
      <div className="space-y-10 px-6">
        {categories.map((category) => (
          <div key={category.id} className="relative">
            {/* Header de Catégorie cliquable */}
            <motion.div 
              className="cursor-pointer"
              onClick={() => toggleCategory(category.id)}
              whileTap={{ scale: 0.98 }}
            >
              <div className="mb-6 group">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-full"></div>
                  <h2 className="text-3xl font-bold text-gray-400 dark:text-white">
                    {category.title}
                  </h2>
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <motion.div
                    animate={{ rotate: expandedCategories[category.id] ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-500 dark:text-gray-400"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </div>
                {category.subtitle && (
                  <p className="text-gray-500 dark:text-gray-400 pl-6 italic border-l-2 border-indigo-200 dark:border-indigo-800">
                    {category.subtitle}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Contenu de la catégorie (animé) */}
            <AnimatePresence>
              {expandedCategories[category.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {cartoons.map(cartoon => (
                        <CartoonList
                          key={cartoon.id}
                          {...cartoon}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      ))}
                    </div>

                    <div className="flex justify-start mt-8">
                      <Button 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-indigo-500/30 transition-all"
                      >
                        + Ajouter un cartoon
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}