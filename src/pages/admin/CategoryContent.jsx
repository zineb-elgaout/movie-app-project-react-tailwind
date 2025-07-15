import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AdminLayout from "../../Layouts/admin/AdminLayout";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import { getAllCartoons, deleteCartoon } from "../../../services/cartoonService";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { FiEdit, FiTrash2, FiArrowLeft, FiPlus } from "react-icons/fi";

export default function CategoryContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cartoons, setCartoons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartoons = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllCartoons();
        const filtered = response.data.filter(
          (cartoon) => cartoon.categorieId.toString() === id
        );
        setCartoons(filtered);
      } catch (err) {
        setError("Erreur lors du chargement des cartoons");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartoons();
  }, [id]);

  const handleDelete = async (cartoonId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce cartoon ?")) {
      try {
        await deleteCartoon(cartoonId);
        setCartoons(cartoons.filter(cartoon => cartoon.id !== cartoonId));
      } catch (err) {
        setError("Erreur lors de la suppression");
        console.error(err);
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <AdminLayout>
      <section className="px-6 py-8 bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <Header
            header={{
              prefix: 'Gestion des',
              title: 'Cartoons',
              subtitle: `Contenus de la catégorie ${id}`
            }}
          />

          <div className="bg-gray-700 rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-8">
              <Link 
                to="/categories" 
                className="flex items-center text-indigo-200 hover:text-indigo-300 transition-colors"
              >
                <FiArrowLeft className="mr-2" />
                Retour aux catégories
              </Link>
              
              <Button 
                onClick={() => navigate(`/cartoons/new?category=${id}`)}
                variant="primary"
                className="flex items-center"
              >
                <FiPlus className="mr-2" />
                Ajouter un cartoon
              </Button>
            </div>

            {cartoons.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucun cartoon trouvé pour cette catégorie.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cartoons.map((cartoon) => (
                  <div
                    key={cartoon.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200"
                  >
                    <div className="relative">
                      <img
                        src={cartoon.image_url}
                        alt={cartoon.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <button
                          onClick={() => navigate(`/cartoons/edit/${cartoon.id}`)}
                          className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
                          title="Modifier"
                        >
                          <FiEdit className="text-indigo-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(cartoon.id)}
                          className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
                          title="Supprimer"
                        >
                          <FiTrash2 className="text-red-600" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{cartoon.title}</h3>
                        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                          {cartoon.release_year}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2 mb-2">
                          Durée: {cartoon.duration || 'N/A'}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2 mb-2">
                          Épisodes: {cartoon.episodes || 'N/A'}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mb-2">
                          Studio: {cartoon.studio || 'N/A'}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {cartoon.description}
                      </p>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500">
                          Créé le: {new Date(cartoon.createdAt).toLocaleDateString()}
                        </span>
                        <Link
                          to={`/cartoons/${cartoon.id}`}
                          className="text-sm text-indigo-100 hover:text-indigo-300 font-medium "
                        >
                          Voir plus
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}