import { useState } from 'react';
import { FiInstagram, FiMail, FiMapPin, FiCalendar, FiAward, FiBook, FiMessageSquare , FiHeart } from 'react-icons/fi';
import { FaDiscord, FaFacebook} from 'react-icons/fa';
import AdminLayout from '../../Layouts/admin/AdminLayout';
import { FaXTwitter } from 'react-icons/fa6';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('favorites');

  // Données du profil pour une app de cartoons
  const profileData = {
    coverPhoto: 'https://www.gannett-cdn.com/-mm-/c4ff156bfef11d468e2b233282a16eb1303f6aa4/c=0-39-768-473/local/-/media/2018/05/22/CarolinaGroup/Greenville/636625918491296957-Fireflies-2-1-.jpg?width=3200&height=1680&fit=crop',
    profilePhoto: 'https://www.nautiljon.com/images/actualite/00/59/1486721458562_image.jpg',
    
    username: 'cartoon_lover',
    fullName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    country: 'New York, USA',
    birthDate: '1995-07-22',
    role:'admin',

    bio: `Passionné de cartoons depuis mon enfance, je collectionne et analyse les séries animées classiques et modernes. 
    Spécialiste des cartoons des années 90 et des productions indépendantes contemporaines. 
    Je partage régulièrement des analyses détaillées et des recommandations.`,

    favoriteGenres: ['Animation', 'Comédie', 'Aventure', 'Science-fiction'],
    watchlist: [
      'Adventure Time',
      'Rick and Morty',
      'Avatar: The Last Airbender',
      'Gravity Falls'
    ],
    likedCartoons: [
      'Steven Universe',
      'Over the Garden Wall',
      'The Amazing World of Gumball',
      'Samurai Jack'
    ],

    interests: ['Analyse de cartoons', 'Histoire de l\'animation', 'Voice acting', 'Character design'],

    socialLinks: {
      instagram: 'instagram',
      discord: 'discord',
      facebook: 'facebook',
      twitter: 'twitter'
    },

    stats: {
      reviewsPosted: 86,
      followers: 450,
      following: 120,
      cartoonsWatched: 320
    }
  };

  return (
    <AdminLayout>
        {/* Photo de couverture */}
        <div 
          className="h-56 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${profileData.coverPhoto})` }}
        >
          {/* Photo de profil */}
          <div className="absolute -bottom-16 left-8">
            <img 
              src={profileData.profilePhoto} 
              alt="Profile" 
              className="w-40 h-40 rounded-full  object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Contenu du profil */}
        <div className="px-8 pt-20 pb-8">
          {/* En-tête avec nom et titre */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">
              {profileData.fullName}
            </h1>
            <p className="text-lg text-purple-400">@{profileData.username}</p>
          </div>

          {/* Grille principale */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Colonne gauche (1/4 de largeur) */}
            <div className="lg:col-span-1 space-y-6">
              {/* Liens sociaux */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">Réseaux sociaux</h3>
                <div className="space-y-3">
                  <a 
                    href={profileData.socialLinks.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-pink-400 transition-colors"
                  >
                    <FiInstagram className="w-5 h-5 mr-2" />
                    <span className="text-sm">Instagram</span>
                  </a>
                  <div className="flex items-center text-gray-300">
                    <FaDiscord className="w-5 h-5 mr-2 text-indigo-400" />
                    <span className="text-sm">{profileData.socialLinks.discord}</span>
                  </div>
                  <a 
                    href={profileData.socialLinks.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <FaXTwitter className="w-5 h-5 mr-2" />
                    <span className="text-sm">Twitter</span>
                  </a>
                  <a 
                    href={profileData.socialLinks.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-green-400 transition-colors"
                  >
                    <FaFacebook className="w-5 h-5 mr-2" />
                    <span className="text-sm">Facebook</span>
                  </a>
                </div>
              </div>

              {/* Genres préférés */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">Genres préférés</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.favoriteGenres.map((genre, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-600 text-gray-200 text-xs rounded-full hover:bg-gray-500 transition-colors"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Watchlist */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">Ma watchlist</h3>
                <ul className="space-y-2">
                  {profileData.watchlist.slice(0, 4).map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      <span className="text-sm text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Colonne droite (3/4 de largeur) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Informations personnelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700 p-5 rounded-lg">
                  <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">Informations</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <FiMail className="w-4 h-4 mr-3 text-purple-400" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FiMapPin className="w-4 h-4 mr-3 text-purple-400" />
                      <span>{profileData.country}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FiCalendar className="w-4 h-4 mr-3 text-purple-400" />
                      <span>Né le {new Date(profileData.birthDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FiAward className="w-4 h-4 mr-3 text-purple-400" />
                      <span>{profileData.role}</span>
                    </div>
                  </div>
                </div>

                {/* Statistiques */}
                <div className="bg-gray-700 p-5 rounded-lg">
                  <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">Statistiques</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-purple-400">{profileData.stats.cartoonsWatched}</p>
                      <p className="text-xs text-gray-400">Cartoons vus</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-400">{profileData.stats.reviewsPosted}</p>
                      <p className="text-xs text-gray-400">Critiques</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-400">{profileData.stats.followers}</p>
                      <p className="text-xs text-gray-400">Abonnés</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-400">{profileData.stats.following}</p>
                      <p className="text-xs text-gray-400">Abonnements</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-gray-700 p-5 rounded-lg">
                <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">À propos</h3>
                <p className="text-gray-300 leading-relaxed">{profileData.bio}</p>
              </div>

              {/* Séparateur */}
              <div className="border-t border-gray-600 my-4"></div>

              {/* Onglets */}
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
                  Favoris
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
                  Critiques
                </button>
              </div>

              {/* Contenu des onglets */}
              <div className="bg-gray-700 rounded-lg p-6">
                {activeTab === 'favorites' ? (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Mes cartoons favoris</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {profileData.likedCartoons.map((cartoon, index) => (
                        <div key={index} className="bg-gray-600 p-4 rounded-lg shadow-sm border border-gray-500 hover:border-purple-400 transition-colors">
                          <h4 className="font-medium text-white">{cartoon}</h4>
                          <p className="text-sm text-gray-300 mt-1">Ma note: ★★★★★</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Mes dernières critiques</h3>
                    <div className="space-y-4">
                      {[1, 2].map((item) => (
                        <div key={item} className="bg-gray-600 p-4 rounded-lg shadow-sm border border-gray-500">
                          <div className="flex items-center mb-2">
                            <img 
                              src={profileData.profilePhoto} 
                              alt="Profile" 
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            <span className="font-medium text-white">Sur "Adventure Time"</span>
                          </div>
                          <p className="text-gray-300">"Une série qui mélange parfaitement absurdité comique et profondeur émotionnelle. Chaque personnage est soigneusement développé sur plusieurs saisons..."</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-400">Posté le {new Date().toLocaleDateString()}</span>
                            <span className="text-yellow-400 text-sm">★★★★☆</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>  
  );
};

export default ProfilePage;