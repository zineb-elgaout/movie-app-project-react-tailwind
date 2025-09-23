import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaHeartCircleCheck } from "react-icons/fa6";
import { addFavorite, removeFavorite, getFavorites } from "../../../services/favoriteService";

export default function Cartoons({ cartoons }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState({});
  const navigate = useNavigate();

  // 🔹 Charger les favoris actuels au montage du composant
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await getFavorites();
        // Extraire les IDs des cartoons favoris
        const favoriteCartoonIds = favorites.map(fav => fav.cartoonId || fav.cartoon?.id);
        setFavoriteIds(favoriteCartoonIds.filter(id => id != null));
      } catch (err) {
        console.error("Erreur lors du chargement des favoris:", err);
      }
    };

    loadFavorites();
  }, []);

  const openTrailer = (trailerUrl) => {
    setSelectedTrailer(trailerUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTrailer(null);
  };

  const getEmbedUrl = (url) => {
    try {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
      console.error("URL de trailer invalide:", url);
      return url; // Retourner l'URL originale en fallback
    }
  };

  const navigateToDetails = (cartoonId) => {
    navigate(`/cartoon/${cartoonId}`);
  };

  // 🔹 Fonction pour gérer les favoris
  const toggleFavorite = async (cartoonId, event) => {
    event.stopPropagation(); // Empêcher la propagation des événements
    
    try {
      setLoadingFavorites(prev => ({ ...prev, [cartoonId]: true }));

      if (favoriteIds.includes(cartoonId)) {
        // Retirer des favoris
        await removeFavorite(cartoonId);
        setFavoriteIds(prev => prev.filter(id => id !== cartoonId));
        console.log("Retiré des favoris:", cartoonId);
      } else {
        // Ajouter aux favoris
        await addFavorite({ cartoonId: cartoonId });
        setFavoriteIds(prev => [...prev, cartoonId]);
        console.log("Ajouté aux favoris:", cartoonId);
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour des favoris:", err);
      alert("Erreur lors de la mise à jour des favoris. Vérifiez votre connexion.");
    } finally {
      setLoadingFavorites(prev => ({ ...prev, [cartoonId]: false }));
    }
  };

  return (
    <div className="pyb-12 bg-black">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {cartoons.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-lg transition-all duration-300 transform hover:scale-105 hover:z-10 cursor-pointer"
          >
            <div className="w-full h-[390px] bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={item.brandImageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-start text-start p-4">
              <h3 className="text-white font-bold text-lg">{item.title}</h3>
              <p className="text-gray-400 text-sm">Sortie : {item.releaseDate}</p>

              <div className="flex flex-col sm:flex-col space-y-2 sm:space-y-0 py-3 w-full gap-2">
                <button
                  onClick={() => openTrailer(getEmbedUrl(item.trailerUrl))}
                  className="bg-purple-600 hover:bg-purple-800 text-white px-3 py-2 rounded-lg font-semibold flex items-center justify-center text-xs sm:text-sm w-full sm:w-auto"
                >
                  Bande-annonce
                </button>

                <button
                  onClick={() => navigateToDetails(item.id)}
                  className="bg-white bg-opacity-30 hover:bg-opacity-20 text-white px-3 py-2 rounded-lg font-semibold flex items-center justify-center text-xs sm:text-sm w-full sm:w-auto"
                >
                  Savoir plus
                </button>
              </div>

              {/* Badge catégorie + favori */}
              <div className="absolute top-2 right-2 flex flex-col gap-2 items-end w-full">
                <div className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {item.categoryTitle}
                </div>
                <button
                  onClick={(e) => toggleFavorite(item.id, e)}
                  disabled={loadingFavorites[item.id]}
                  className={`text-red-600 text-xl transition-all duration-200 ${
                    loadingFavorites[item.id] ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                  }`}
                  title={favoriteIds.includes(item.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  {loadingFavorites[item.id] ? (
                    <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : favoriteIds.includes(item.id) ? (
                    <FaHeartCircleCheck />
                  ) : (
                    <FaHeart />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-black p-4 rounded-lg max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-2xl z-50"
            >
              ✕
            </button>
            <div className="relative w-full h-0 pb-[56.25%] z-10">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={selectedTrailer}
                title="Trailer Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}