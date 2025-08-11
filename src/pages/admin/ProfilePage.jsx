import { useState } from 'react';
import {  FiMail, FiMapPin, FiCalendar, FiAward, FiBook, FiMessageSquare, FiHeart ,FiStar} from 'react-icons/fi';
import AdminLayout from '../../Layouts/admin/AdminLayout';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('favorites');

  // Données du profil pour une app de cartoons
  const profileData = {
    coverPhoto: 'https://www.gannett-cdn.com/-mm-/c4ff156bfef11d468e2b233282a16eb1303f6aa4/c=0-39-768-473/local/-/media/2018/05/22/CarolinaGroup/Greenville/636625918491296957-Fireflies-2-1-.jpg?width=3200&height=1680&fit=crop',
    profilePhoto: 'https://www.nautiljon.com/images/actualite/00/59/1486721458562_image.jpg',
    
    username: 'cartoon_lover',
    fullName: 'zineb elgaout',
    email: 'zineb.elgaout@example.com',
    country: 'New York, USA',
    birthDate: '2004-05-02',
    role:'Admin',

   
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

    

    statistique: {
      critiques:20,
      votes:10,
      favoris:15,
    }
  };

  return (
    <AdminLayout>
      {/* Photo de couverture */}
      <div 
        className="h-56 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${profileData.coverPhoto})` }}
      >
        {/* Conteneur photo de profil avec fond gris */}
        <div className="absolute -bottom-16 left-4">
          {/* Fond gris circulaire (plus grand que la photo) */}
          <div className="absolute -inset-4 bg-gray-900 rounded-full z-0"></div>
          
          {/* Photo de profil par dessus */}
          <img 
            src={profileData.profilePhoto} 
            alt="Profile" 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-gray-900 relative z-10"
          />
        </div>
      </div>
      
      {/* Contenu du profil */}
      <div className="px-4 md:px-8 pt-20 pb-8">
        {/* En-tête avec nom et titre */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {profileData.fullName}
          </h1>
          <p className="text-base md:text-lg text-purple-400">@{profileData.username}</p>
        </div>

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Colonne gauche (1/4 de largeur) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Informations personnelles */}
            <div className="bg-gray-800 p-4 md:p-5 rounded-lg">
              <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">Informations</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <FiMail className="w-4 h-4 mr-3 text-purple-400" />
                  <span className="text-sm md:text-base">{profileData.email}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FiMapPin className="w-4 h-4 mr-3 text-purple-400" />
                  <span className="text-sm md:text-base">{profileData.country}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FiCalendar className="w-4 h-4 mr-3 text-purple-400" />
                  <span className="text-sm md:text-base">Né le {new Date(profileData.birthDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FiAward className="w-4 h-4 mr-3 text-purple-400" />
                  <span className="text-sm md:text-base">{profileData.role}</span>
                </div>
              </div>
            </div>

            {/* Genres préférés */}
            <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">Catégories préférées</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.favoriteGenres.map((genre, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs md:px-3 md:py-1 bg-gray-600 text-gray-200 rounded-full hover:bg-gray-500 transition-colors"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite (3/4 de largeur) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Onglets et statistiques */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex space-x-2 md:space-x-4">
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`px-4 py-2 text-sm md:text-base md:px-6 md:py-2 font-medium rounded-md transition-colors flex items-center ${
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
                  className={`px-4 py-2 text-sm md:text-base md:px-6 md:py-2 font-medium rounded-md transition-colors flex items-center ${
                    activeTab === 'comments' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <FiMessageSquare className="mr-2" />
                  Critiques
                </button>
                <button
                  onClick={() => setActiveTab('votes')}
                  className={`px-4 py-2 text-sm md:text-base md:px-6 md:py-2 font-medium rounded-md transition-colors flex items-center ${
                    activeTab === 'votes' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <FiStar className="mr-2" />
                  Votes
                </button>
              </div>

              {/* Statistiques alignées à droite */}
              <div className="flex flex-wrap gap-2 md:gap-4 justify-end w-full md:w-auto">
                <div className="flex items-center space-x-1 border border-gray-600 rounded-full px-2 py-1 md:px-3 md:py-2">
                  <FiMessageSquare className="text-purple-400 text-sm md:text-base" />
                  <span className="text-gray-200 text-xs md:text-sm">{profileData.statistique.critiques} critiques</span>
                </div>
                <div className="flex items-center space-x-1 border border-gray-600 rounded-full px-2 py-1 md:px-3 md:py-2">
                  <FiHeart className="text-purple-400 text-sm md:text-base" />
                  <span className="text-gray-200 text-xs md:text-sm">{profileData.statistique.favoris} favoris</span>
                </div>
                <div className="flex items-center space-x-1 border border-gray-600 rounded-full px-2 py-1 md:px-3 md:py-2">
                  <FiStar className="text-purple-400 text-sm md:text-base" />
                  <span className="text-gray-200 text-xs md:text-sm">{profileData.statistique.votes} votes</span>
                </div>
              </div>
            </div>

            {/* Contenu des onglets */}
            
            <div className="bg-gray-800 rounded-lg p-4 md:p-6">
              {activeTab === 'favorites' ? (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Mes cartoons favoris</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profileData.likedCartoons.map((cartoon, index) => (
                      <div key={index} className="bg-gray-700 p-3 md:p-4 rounded-lg shadow-sm border border-gray-500 hover:border-purple-400 transition-colors">
                        <h4 className="font-medium text-white text-sm md:text-base">{cartoon}</h4>
                        <p className="text-xs md:text-sm text-gray-300 mt-1">Ma note: ★★★★★</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : activeTab === 'comments' ? (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Mes dernières critiques</h3>
                  <div className="space-y-4">
                    {[1, 2].map((item) => (
                      <div key={item} className="bg-gray-700 p-3 md:p-4 rounded-lg shadow-sm border border-gray-500">
                        <div className="flex items-center mb-2">
                          <img 
                            src={profileData.profilePhoto} 
                            alt="Profile" 
                            className="w-6 h-6 md:w-8 md:h-8 rounded-full mr-2"
                          />
                          <span className="font-medium text-white text-sm md:text-base">Sur "Adventure Time"</span>
                        </div>
                        <p className="text-gray-300 text-xs md:text-sm">"Une série qui mélange parfaitement absurdité comique et profondeur émotionnelle. Chaque personnage est soigneusement développé sur plusieurs saisons..."</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-400">Posté le {new Date().toLocaleDateString()}</span>
                          <span className="text-yellow-400 text-xs md:text-sm">★★★★☆</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Mes derniers votes</h3>
                  <div className="space-y-4">
                    {[1, 2].map((item) => (
                      <div key={item} className="bg-gray-700 p-3 md:p-4 rounded-lg shadow-sm border border-gray-500">
                        <div className="flex items-center mb-2">
                          <img 
                            src={profileData.profilePhoto} 
                            alt="Profile" 
                            className="w-6 h-6 md:w-8 md:h-8 rounded-full mr-2"
                          />
                          <span className="font-medium text-white text-sm md:text-base">Sur "Adventure Time"</span>
                        </div>
                        <p className="text-gray-300 text-xs md:text-sm">"Une série qui mélange parfaitement absurdité comique et profondeur émotionnelle. Chaque personnage est soigneusement développé sur plusieurs saisons..."</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-400">Voté le {new Date().toLocaleDateString()}</span>
                          <span className="text-yellow-400 text-xs md:text-sm">★★★★☆</span>
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