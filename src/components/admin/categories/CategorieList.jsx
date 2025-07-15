import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiEdit, FiTrash } from "react-icons/fi";
import UpdateCategory from "./UpdateCategory";
import { deleteCategory } from "../../../../services/categoryService";
import useCategories from "../../../../src/hooks/useCategories";
import Loading from "../../Loading";
import ErrorMessage from "../../ErrorMessage";

export default function CategoryList() {
  const { categories, loading, error, fetchCategories } = useCategories();
  const [showUpdate, setShowUpdate] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  // Handle Delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Voulez-vous vraiment supprimer cette catégorie ?");
    if (!confirm) return;

    try {
      await deleteCategory(id);
      await fetchCategories(); // refresh la liste
    } catch (error) {
      console.error("Erreur de suppression :", error);
      alert("Échec de la suppression.");
    }
  };

  // Handle Edit
  const handleEdit = (category) => {
    setCategoryToEdit(category);
    setShowUpdate(true);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <div className="max-w-7xl mx-auto mb-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.length === 0 ? (
          <p className="text-start text-gray-500">
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

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

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
          fetchCategories={fetchCategories}
        />
      )}
    </div>
  );
}
