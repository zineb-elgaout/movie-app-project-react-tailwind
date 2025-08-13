import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "../../Layouts/admin/AdminLayout";
import CreateCartoon from "../../components/admin/cartoons/CreateCartoon";
import UpdateCartoon from "../../components/admin/cartoons/UpdateCartoon";
import Header from "../../components/ui/Header";
import { getCategoryById } from "../../../services/categoryService";
import Button from "../../components/ui/Button";
import { getAllCartoons, deleteCartoon } from "../../../services/cartoonService";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { FiEdit, FiTrash2, FiArrowLeft, FiPlus, FiExternalLink, FiFolder, FiEye } from "react-icons/fi";

export default function CategoryContent() {
  const { id } = useParams();
  const [cartoons, setCartoons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [cartoonToEdit, setCartoonToEdit] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCartoon, setSelectedCartoon] = useState(null);

  const fetchCartoons = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllCartoons();
      const filtered = response.data.filter(
        (cartoon) => cartoon.categoryId?.toString() === id
      );
      setCartoons(filtered);
    } catch (err) {
      setError("Erreur lors du chargement des cartoons");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchCategoryTitle = useCallback(async () => {
    try {
      const res = await getCategoryById(id);
      setCategoryTitle(res.data.title);
    } catch {
      setCategoryTitle("");
    }
  }, [id]);

  useEffect(() => {
    fetchCartoons();
    fetchCategoryTitle();
  }, [fetchCartoons, fetchCategoryTitle]);

  const handleDelete = async (cartoonId) => {
    if (window.confirm("Supprimer ce cartoon ?")) {
      try {
        await deleteCartoon(cartoonId);
        fetchCartoons();
      } catch {
        setError("Erreur lors de la suppression");
      }
    }
  };

  const handleViewDetails = (cartoon) => {
    setSelectedCartoon(cartoon);
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
              prefix: "Contenu de ",
              title: `Catégorie : ${categoryTitle || ""}`,
              subtitle: `voux pouvez gérer les cartoon liés à  ${categoryTitle || ""}`,
            }}
          />

          <div className="flex justify-between items-center mb-6">
            <Link to="/categories" className="flex items-center text-indigo-300 hover:text-indigo-400 transition-colors">
              <FiArrowLeft className="mr-2" /> Retour aux autres catégories
            </Link>
            <Button onClick={() => setShowCreate(true)}>
              + Ajouter un cartoon
            </Button>
          </div>

          {/* Tableau des cartoons */}
          <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden my-5">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-300">Titre</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-300">Description</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-300">Date de sortie</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-300">Favoris</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-300">Créé par</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {cartoons.length > 0 ? (
                    cartoons.map((cartoon) => (
                      <tr key={cartoon.id} className="hover:bg-gray-750 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                          {cartoon.title}
                        </td>
                        <td className="px-6 py-4 text-gray-300 max-w-xs truncate">
                          {cartoon.description || "Aucune description"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                          {cartoon.releaseDate || "Non spécifiée"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                          {cartoon.countFavoris || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                          <div>
                            <div>{cartoon.createdByEmail}</div>
                            <span className="text-xs text-gray-400">{cartoon.createdByRole}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-2">
                            {/* Icône Voir détails */}
                            <button 
                              className="p-2 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-gray-700 transition-colors"
                              title="Voir détails"
                              onClick={() => handleViewDetails(cartoon)}
                            >
                              <FiEye size={18} />
                            </button>

                            

                            {/* Icône Modifier */}
                            <button 
                              className="p-2 rounded-full text-gray-400 hover:text-purple-400 hover:bg-gray-700 transition-colors"
                              title="Modifier"
                              onClick={() => setCartoonToEdit(cartoon)}
                            >
                              <FiEdit size={18} />
                            </button>

                            {/* Icône Supprimer */}
                            <button 
                              className="p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors"
                              title="Supprimer"
                              onClick={() => handleDelete(cartoon.id)}
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
                        Aucun cartoon trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showCreate && (
          <CreateCartoon
            categoryId={id}
            onClose={() => {
              setShowCreate(false);
              fetchCartoons();
            }}
          />
        )}

        { cartoonToEdit && (
          <UpdateCartoon
            cartoon={cartoonToEdit}
            onClose={() => {
              setShowUpdate(false);
              setCartoonToEdit(null);
              
            }}fetchCartoons={fetchCartoons}
          />
        )}

        {/* Modal de détails */}
        {showDetailModal && selectedCartoon && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-white">{selectedCartoon.title}</h2>
                  <button 
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-white transition-colors text-2xl"
                  >
                    &times;
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Brand Image</h3>
                    <img 
                      src={selectedCartoon.brandImageUrl || "/placeholder-image.jpg"} 
                      alt={selectedCartoon.title}
                      className="w-full rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Background image</h3>
                    <img 
                      src={selectedCartoon.backImageUrl || "/placeholder-image.jpg"} 
                      alt={selectedCartoon.title}
                      className="w-full rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Description</h3>
                      <p className="text-white">{selectedCartoon.description || "Aucune description"}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Date de sortie</h3>
                        <p className="text-white">{selectedCartoon.releaseDate || "Non spécifiée"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Nombre de favoris</h3>
                        <p className="text-white">{selectedCartoon.countFavoris || 0}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Personnages principaux</h3>
                        <p className="text-white">{selectedCartoon.mainCharacters || "Non spécifiés"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Mots-clés</h3>
                        <p className="text-white">{selectedCartoon.keywords || "Aucun"}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Trailer URL</h3>
                        <a href={selectedCartoon.trailerUrl} className="text-white">"{selectedCartoon.trailerUrl || "Aucun"}"</a>
                      </div>
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
      </section>
    </AdminLayout>
  );
}