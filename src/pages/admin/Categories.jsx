import { useState } from "react";
import AdminLayout from "../../Layouts/admin/AdminLayout";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import useCategories from "../../hooks/useCategories";
import AddCategory from "../../components/admin/categories/AddCategory";
import { FiEye, FiEdit, FiTrash2, FiExternalLink} from 'react-icons/fi';
import { Link } from "react-router-dom";
import UpdateCategory from "../../components/admin/categories/UpdateCategory";
import { deleteCategory } from "../../../services/categoryService";

export default function Categories() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const { categories, loading, error, fetchCategories, token } = useCategories();

  const handleAfterAdd = () => {
    setShowAddForm(false);
    fetchCategories();
  };

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

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowUpdateForm(true);
  };

  const handleViewDetails = (category) => {
    setSelectedCategory(category);
    setShowDetailModal(true);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <AdminLayout>
      <section className="px-4 sm:px-6 py-8 bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <Header
            header={{
              prefix: "Gestion des",
              title: "Catégories",
              subtitle: "Organisez vos contenus par univers et studios d'animation.",
            }}
          />

          {/* Bouton Ajouter */}
          <div className="flex justify-end mt-6 mb-4">
            <Button onClick={() => setShowAddForm(true)}>
              + Ajouter une catégorie
            </Button>
          </div>

          {/* Tableau des catégories */}
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden my-5">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-gray-300">Titre</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-300">Description</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-300">Cartoons</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-300">Créé le</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-300">Créé par</th>
                      <th className="px-6 py-4 text-right font-semibold text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <tr key={category.id} className="hover:bg-gray-750 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                            {category.title}
                          </td>
                          <td className="px-6 py-4 text-gray-300 max-w-xs truncate">
                            {category.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                            {category.cartoonsCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                            {new Date(category.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                            <div>
                              <div>{category.createdByEmail}</div>
                              <span className="text-xs text-gray-400">{category.createdByRole}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex justify-end gap-2">
                              {/* Icône Accéder au contenu */}
                              <Link
                                to={`/category/${category.id}`}
                                className="p-2 rounded-full text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-colors"
                                title="Accéder au contenu"
                              >
                                <FiExternalLink size={18} />
                              </Link>

                              {/* Icône Voir détails */}
                              <button 
                                className="p-2 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-gray-700 transition-colors"
                                title="Voir détails"
                                onClick={() => handleViewDetails(category)}
                              >
                                <FiEye size={18} />
                              </button>

                              

                              {/* Icône Modifier */}
                              <button 
                                className="p-2 rounded-full text-gray-400 hover:text-purple-400 hover:bg-gray-700 transition-colors"
                                title="Modifier"
                                onClick={() => handleEdit(category)}
                              >
                                <FiEdit size={18} />
                              </button>

                              {/* Icône Supprimer */}
                              <button 
                                className="p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors"
                                title="Supprimer"
                                onClick={() => handleDelete(category.id)}
                              >
                                <FiTrash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                          Aucune catégorie trouvée
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal d'ajout */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AddCategory
            onClose={handleAfterAdd}
          />
        </div>
      )}

      {/* Modal d'édition */}
      {showUpdateForm && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <UpdateCategory
            category={selectedCategory}
            onClose={() => setShowUpdateForm(false)}
            fetchCategories={fetchCategories}
            token={token}
          />
        </div>
      )}

      {/* Modal de détails */}
      {showDetailModal && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedCategory.title}</h2>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Description</h3>
                  <p className="text-white">{selectedCategory.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Nombre de cartoons</h3>
                    <p className="text-white">{selectedCategory.cartoonsCount}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Date de création</h3>
                    <p className="text-white">
                      {new Date(selectedCategory.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Créé par</h3>
                    <p className="text-white">{selectedCategory.createdByEmail}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Rôle</h3>
                    <p className="text-white">{selectedCategory.createdByRole}</p>
                  </div>
                </div>

                
              </div>

              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}