import React, { useEffect, useState } from "react";
import { getFavorites } from "../../../services/favoriteService"; 
import Cartoons from "../../components/client/Cartoons";
import NavBar from "../../Layouts/client/NavBar";
import { Heart, HeartOff, RefreshCw, Star } from "lucide-react";

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFavorites = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setRefreshing(isRefresh);
      setError(null);
      
      const data = await getFavorites();
      console.log("Données brutes reçues:", data);

      if (!data || !Array.isArray(data)) {
        setFavorites([]);
        return;
      }

      if (data.length === 0) {
        setFavorites([]);
        return;
      }

      const firstItem = data[0];
      let cartoonsOnly = [];

      if (firstItem.cartoon) {
        cartoonsOnly = data
          .map(fav => fav.cartoon)
          .filter(cartoon => cartoon != null);
      } else if (firstItem.cartoonId || firstItem.title) {
        cartoonsOnly = data;
      }

      setFavorites(cartoonsOnly);
      
    } catch (err) {
      console.error("Erreur complète:", err);
      const errorMessage = err.response?.data?.message || 
                         err.response?.data || 
                         err.message || 
                         "Erreur lors du chargement des favoris";
      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // État de chargement professionnel
  if (loading) return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-2 border-purple-500/30 border-t-purple-500 mb-6"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Chargement en cours</h2>
        <p className="text-gray-400 text-center max-w-md">
          Préparation de votre collection personnelle...
        </p>
      </div>
    </div>
  );
  
  // État d'erreur professionnel
  if (error) return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
            <HeartOff className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Erreur de chargement</h2>
          <p className="text-gray-300 mb-6 text-sm">{error}</p>
          <button 
            onClick={() => fetchFavorites(true)}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center mx-auto border border-gray-600"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Réessayer
          </button>
        </div>
      </div>
    </div>
  );
  
  // État vide professionnel
  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <NavBar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
          <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Collection vide</h2>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Votre liste de favoris est actuellement vide. Parcourez notre catalogue et ajoutez vos cartoons préférés pour les retrouver ici.
            </p>
            <button 
              onClick={() => window.location.href = '/toontime'}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 w-full"
            >
              Explorer le catalogue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Page principale 
  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      
      {/* Header */}
      <div className="relative pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="text-center lg:text-left mb-6 lg:mb-0">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-600 to-pink-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                      Mes Favoris
                    </h1>
                    <p className="text-gray-400 text-sm">
                      Votre sélection personnelle de contenus préférés
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-gray-800/80 px-4 py-2 rounded-full border border-gray-600">
                  <span className="text-white font-semibold flex items-center text-sm">
                    <Star className="w-4 h-4 mr-2 text-yellow-400" />
                    {favorites.length} élément{favorites.length > 1 ? 's' : ''}
                  </span>
                </div>
                <button 
                  onClick={() => fetchFavorites(true)}
                  disabled={refreshing}
                  className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white p-3 rounded-lg transition-all duration-200 disabled:opacity-50"
                  title="Rafraîchir la liste"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section des cartoons */}
      <div className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          </div>
          <Cartoons cartoons={favorites} />
        </div>
      </div>

      {/* Footer discret */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-600 text-sm text-center">
            Dernière mise à jour • {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
    </div>
  );
}