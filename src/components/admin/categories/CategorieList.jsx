import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEdit, FiTrash } from "react-icons/fi";
import UpdateCategory from "./UpdateCategory";
import { deleteCategory } from "../../../../services/categoryService";
import useCategories from "../../../../src/hooks/useCategories";
import Loading from "../../Loading";
import ErrorMessage from "../../ErrorMessage";

export default function CategoryList() {
  const { categories, loading, error, fetchCategories, token } = useCategories();
  const [showUpdate, setShowUpdate] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  // Suppression
  const handleDelete = async (id) => {
    const confirm = window.confirm("Voulez-vous vraiment supprimer cette catégorie ?");
    if (!confirm) return;

    try {
      await deleteCategory(id, token);
      await fetchCategories();
    } catch (error) {
      console.error("Erreur de suppression :", error);
      alert("Échec de la suppression.");
    }
  };

  // Edition
  const handleEdit = (category) => {
    setCategoryToEdit(category);
    setShowUpdate(true);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-7xl mx-auto mb-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.length === 0 ? (
          <p className="text-start text-gray-500">
            Aucune catégorie disponible pour le moment.
          </p>
        ) : (
          categories.map(({ id, title, description }) => (
            <Link
              to={`/category/${id}`}
              key={id}
              className="relative rounded-xl overflow-hidden h-40 group block bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 shadow-lg"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative h-full flex flex-col justify-between"
              >
                {/* Boutons actions */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleEdit({ id, title, description });
                    }}
                    title="Modifier"
                    className="bg-white/80 text-gray-800 hover:bg-white p-2 rounded-full shadow"
                  >
                    <FiEdit />
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDelete(id);
                    }}
                    title="Supprimer"
                    className="bg-white/80 text-gray-800 hover:bg-white p-2 rounded-full shadow"
                  >
                    <FiTrash />
                  </button>
                </div>

                {/* Infos catégorie */}
                <div>
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="text-sm opacity-90">{description}</p>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>

      {showUpdate && categoryToEdit && (
        <UpdateCategory
          category={categoryToEdit}
          onClose={() => setShowUpdate(false)}
          fetchCategories={fetchCategories}
          token={token}
        />
      )}
    </div>
  );
}
