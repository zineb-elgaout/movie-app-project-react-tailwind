import { useState, useEffect } from 'react';
import { FiMail, FiMapPin, FiUser, FiAward, FiMessageSquare, FiHeart, FiStar, FiClock, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getUserProfile } from '../../../services/userService';
import { getFavorites } from '../../../services/favoriteService';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  // Charger les données du profil et des favoris
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        
        // Charger le profil utilisateur
        const userProfile = await getUserProfile();
        setProfileData(userProfile);

        // Charger les favoris
        await loadFavorites();
        
      } catch (err) {
        console.error('Erreur lors du chargement du profil:', err);
        setError('Impossible de charger le profil');
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const loadFavorites = async () => {
    try {
      setFavoritesLoading(true);
      const data = await getFavorites();
      
      if (data && Array.isArray(data)) {
        const firstItem = data[0];
        let cartoonsOnly = [];

        if (firstItem?.cartoon) {
          cartoonsOnly = data
            .map(fav => fav.cartoon)
            .filter(cartoon => cartoon != null);
        } else if (firstItem?.cartoonId || firstItem?.title) {
          cartoonsOnly = data;
        }

        setFavorites(cartoonsOnly);
      } else {
        setFavorites([]);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des favoris:', err);
      setFavorites([]);
    } finally {
      setFavoritesLoading(false);
    }
  };

  // Formatage de la date d'inscription
  const formatMemberSince = (dateString) => {
    const date = new Date(dateString);
    return `Membre depuis ${date.toLocaleDateString('fr-FR', { 
      month: 'long', 
      year: 'numeric' 
    })}`;
  };

  // Obtenir seulement les 6 premiers favoris
  const displayedFavorites = favorites.slice(0, 6);
  const hasMoreFavorites = favorites.length > 6;

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-2 border-purple-500/30 border-t-purple-500 mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FiUser className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Chargement du profil</h2>
          <p className="text-gray-400 text-center max-w-md">
            Préparation de votre profil...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black">
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
          <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <FiUser className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Erreur de chargement</h2>
            <p className="text-gray-300 mb-6 text-sm">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center mx-auto border border-gray-600"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  const userStats = {
    favoris: favorites.length,
    critiques: 0,
    votes: 0,
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Photo de couverture */}
      <div 
        className="h-56 bg-cover bg-center relative"
        style={{ 
          backgroundImage: `url(https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)`,
          backgroundPosition: 'center'
        }}
      >
        {/* Photo de profil */}
        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            <img 
              src={profileData.profilePhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-gray-900 bg-gray-700"
            />
          </div>
        </div>
      </div>
      
      {/* Contenu du profil */}
      <div className="px-4 md:px-8 pt-20 pb-8">
        {/* En-tête avec nom et informations */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {profileData.firstName} {profileData.lastName}
          </h1>
          <p className="text-base md:text-lg text-purple-400 mb-1">
            @{profileData.firstName?.toLowerCase()}_{profileData.lastName?.toLowerCase()}
          </p>
          <p className="text-sm text-gray-400 flex items-center">
            <FiClock className="w-4 h-4 mr-2" />
            {formatMemberSince(profileData.createdAt)}
          </p>
        </div>

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Colonne gauche - Informations */}
          <div className="lg:col-span-1 space-y-6">
            {/* Informations personnelles */}
            <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
              <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">
                Informations du compte
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <FiMail className="w-4 h-4 mr-3 text-purple-400" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FiMapPin className="w-4 h-4 mr-3 text-purple-400" />
                  <span className="text-sm">{profileData.nationality || 'Non spécifié'}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FiUser className="w-4 h-4 mr-3 text-purple-400" />
                  <span className="text-sm">{profileData.role}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FiAward className="w-4 h-4 mr-3 text-purple-400" />
                  <span className="text-sm">
                    {userStats.favoris} favori{userStats.favoris > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Contenu principal */}
          <div className="lg:col-span-3 space-y-6">
            {/* Onglets */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`px-6 py-2 font-medium rounded-md transition-colors flex items-center ${
                    activeTab === 'favorites' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <FiHeart className="mr-2" />
                  Favoris ({userStats.favoris})
                </button>
                <button
                  onClick={() => setActiveTab('comments')}
                  className={`px-6 py-2 font-medium rounded-md transition-colors flex items-center ${
                    activeTab === 'comments' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <FiMessageSquare className="mr-2" />
                  Critiques ({userStats.critiques})
                </button>
                <button
                  onClick={() => setActiveTab('votes')}
                  className={`px-6 py-2 font-medium rounded-md transition-colors flex items-center ${
                    activeTab === 'votes' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <FiStar className="mr-2" />
                  Votes ({userStats.votes})
                </button>
              </div>
            </div>

            {/* Contenu des onglets */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 min-h-[400px]">
              {activeTab === 'favorites' ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-white">Mes cartoons favoris</h3>
                    {hasMoreFavorites && (
                      <Link 
                        to="/favoris"
                        className="flex items-center text-purple-400 hover:text-purple-300 text-sm transition-colors"
                      >
                        Voir tous ({favorites.length})
                        <FiArrowRight className="ml-1" />
                      </Link>
                    )}
                  </div>
                  
                  {favoritesLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
                    </div>
                  ) : favorites.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiHeart className="w-8 h-8 text-gray-400" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-300 mb-2">Aucun favori</h4>
                      <p className="text-gray-400 text-sm mb-4">
                        Vous n'avez pas encore ajouté de cartoons à vos favoris.
                      </p>
                      <Link 
                        to="/toontime"
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-colors"
                      >
                        Découvrir les cartoons
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {displayedFavorites.map((favorite, index) => (
                          <div key={favorite.id || index} className="bg-gray-700 rounded-lg border border-gray-600 hover:border-purple-400 transition-all duration-200 hover:scale-105">
                            <div className="h-40 bg-gray-600 rounded-t-lg overflow-hidden">
                              <img 
                                src={favorite.backImageUrl} 
                                alt={favorite.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1635863138275-d9b33299680a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                                }}
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="font-medium text-white text-sm mb-1 truncate">{favorite.title}</h4>
                              <p className="text-gray-300 text-xs">
                                {favorite.releaseDate ? new Date(favorite.releaseDate).getFullYear() : 'Date inconnue'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {hasMoreFavorites && (
                        <div className="text-center border-t border-gray-700 pt-6">
                          <Link 
                            to="/favoris"
                            className="inline-flex items-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                          >
                            Voir les {favorites.length - 6} autres favoris
                            <FiArrowRight className="ml-2" />
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : activeTab === 'comments' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiMessageSquare className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-300 mb-2">Fonctionnalité à venir</h4>
                  <p className="text-gray-400 text-sm">
                    La gestion des critiques sera bientôt disponible.
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiStar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-300 mb-2">Fonctionnalité à venir</h4>
                  <p className="text-gray-400 text-sm">
                    La gestion des votes sera bientôt disponible.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;