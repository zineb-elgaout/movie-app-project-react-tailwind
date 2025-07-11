import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiEdit, FiTrash } from "react-icons/fi"; 
import UpdateCategory from "./UpdateCategory";
import { deleteCategory, getAllCategories } from "../../../../services/categoryService";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showUpdate, setShowUpdate] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

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

  if (loading) return <p className="text-gray-400 text-center">Chargement...</p>;
  if (error) return <p className="text-gray-400 text-center">{error}</p>;


  //handle delete 
  const handleDelete = async (id) => {
  const confirm = window.confirm("Voulez-vous vraiment supprimer cette catégorie ?");
  if (!confirm) return;

    try {
      await deleteCategory(id); // appel à l’API
      setCategories(prev => prev.filter(cat => cat.id !== id)); // mise à jour de l’état
    } catch (error) {
      console.error("Erreur de suppression :", error);
      alert("Échec de la suppression.");
    }
  };

  //handlde update 
  const handleEdit = (category) => {
    setCategoryToEdit(category);
    setShowUpdate(true);
  };

  return (
    <div className="max-w-7xl mx-auto mb-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.length === 0 ? (
          <p className="text-start text-gray-500 ">
            Aucune catégorie disponible pour le moment.
          </p>
        ) : (
          categories.map(({ id, title, subtitle, image }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-xl overflow-hidden h-80 group"
            >
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay noir transparent */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Boutons en haut à droite */}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit({ id, title, subtitle, image })}
                  title="Modifier"
                  className="bg-white/80 text-gray-800 hover:bg-white p-2 rounded-full shadow"
                >
                  <FiEdit />
                </button>
                <button
                  title="Supprimer"
                  className="bg-white/80 text-gray-800 hover:bg-white p-2 rounded-full shadow"
                  onClick={() => handleDelete(id)}
                >
                  <FiTrash />
                </button>
              </div>

              {/* Titre et sous-titre en bas */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/30 to-transparent backdrop-blur-sm px-4 py-3">
                <h3 className="text-xl font-bold text-white drop-shadow-md">
                  {title}
                </h3>
                <p className="text-sm text-white drop-shadow-sm">
                  {subtitle}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
      {showUpdate && categoryToEdit && (
        <UpdateCategory
          category={categoryToEdit}
          onClose={() => setShowUpdate(false)}
        />
      )}


    </div>
    
  );
};

