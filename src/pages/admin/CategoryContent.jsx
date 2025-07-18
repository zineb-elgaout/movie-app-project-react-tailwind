import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AdminLayout from "../../Layouts/admin/AdminLayout";
import CartoonCrud from "../../components/admin/cartoons/CartoonCrud";
import Header from "../../components/ui/Header";
import { getCategoryById } from "../../../services/categoryService";
import Button from "../../components/ui/Button";
import { getAllCartoons, deleteCartoon } from "../../../services/cartoonService";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { FiEdit, FiTrash2, FiArrowLeft, FiPlus, FiStar } from "react-icons/fi";

export default function CategoryContent() {
  const { id } = useParams();
  const [cartoons, setCartoons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentCartoon, setCurrentCartoon] = useState(null);

  const fetchCartoons = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllCartoons();
      const filtered = response.data
        .filter(cartoon => cartoon.categorieId && cartoon.categorieId.toString() === id)
        .map(cartoon => ({
          ...cartoon,
          categoryTitle: cartoon.category?.title // Ajoutez cette ligne
        }));
      setCartoons(filtered);
    } catch (err) {
      setError("Erreur lors du chargement des cartoons");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const [categoryTitle, setCategoryTitle] = useState('');

const fetchCategoryTitle = useCallback(async () => {
  try {
    const response = await getCategoryById(id); 
    setCategoryTitle(response.data.title);
  } catch (err) {
    console.error("Erreur lors du chargement du titre de la catégorie", err);
  }
}, [id]);

useEffect(() => {
  fetchCartoons();
  fetchCategoryTitle();
}, [fetchCartoons, fetchCategoryTitle]);


  const handleAddCartoon = () => {
    setCurrentCartoon(null);
    setShowModal(true);
  };

  const handleEditCartoon = (cartoon) => {
    setCurrentCartoon({
      ...cartoon,
      // Assure la compatibilité avec CartoonCrud
      mainCaracter: cartoon.mainCharacter,
      categoryId: cartoon.categorieId,
      year: cartoon.releaseYear
    });
    setShowModal(true);
  };

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
      <section className="px-4 sm:px-6 py-8 bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <Header
            header={{
              prefix: 'Gestion des',
              title: 'Cartoons',
              subtitle: `Contenus de la catégorie ${categoryTitle || id}`
            }}
          />

          <div className="bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <Link 
                to="/categories" 
                className="flex items-center text-indigo-300 hover:text-indigo-400 transition-colors"
              >
                <FiArrowLeft className="mr-2" />
                Retour aux catégories
              </Link>
              
              <Button 
                onClick={handleAddCartoon}
                variant="primary"
                className="flex items-center w-full sm:w-auto justify-center"
              >
                <FiPlus className="mr-2" />
                Ajouter un cartoon
              </Button>
            </div>

            {cartoons.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Aucun cartoon trouvé pour cette catégorie.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {cartoons.map((cartoon) => (
                  <div
                    key={cartoon.id}
                    className="bg-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 border border-gray-600"
                  >
                    <div className="relative">
                      <img
                        src={cartoon.image_url || '/placeholder-image.jpg'}
                        alt={cartoon.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <button
                          onClick={() => handleEditCartoon(cartoon)}
                          className="p-2 bg-white/90 rounded-full shadow hover:bg-white transition"
                          title="Modifier"
                        >
                          <FiEdit className="text-indigo-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(cartoon.id)}
                          className="p-2 bg-white/90 rounded-full shadow hover:bg-white transition"
                          title="Supprimer"
                        >
                          <FiTrash2 className="text-red-600" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-white truncate max-w-[70%]">
                          {cartoon.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {cartoon.rating && (
                            <span className="flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                              <FiStar className="mr-1" />
                              {cartoon.rating}
                            </span>
                          )}
                          <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                            {cartoon.releaseYear}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {cartoon.type && (
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {cartoon.type}
                          </span>
                        )}
                        {cartoon.duration && (
                          <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                            {cartoon.duration} min
                          </span>
                        )}
                        {cartoon.mainCharacter && (
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            {cartoon.mainCharacter}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                        {cartoon.description || 'Aucune description disponible'}
                      </p>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-gray-600">
                        <span className="text-xs text-gray-400">
                          Créé le: {new Date(cartoon.createdAt).toLocaleDateString()}
                        </span>
                        <div className="text-xs text-gray-400">
                          ID: {cartoon.id}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {showModal && (
          <CartoonCrud 
            onClose={() => {
              setShowModal(false);
              setCurrentCartoon(null);
              fetchCartoons();
            }}
            cartoonToEdit={currentCartoon}
          />
        )}
      </section>
    </AdminLayout>
  );
}