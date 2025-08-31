import { useState } from 'react';
import { FiMail, FiMapPin, FiCalendar, FiAward, FiBook, FiMessageSquare, FiHeart, FiStar, FiEdit2, FiCamera, FiX } from 'react-icons/fi';
import AdminLayout from '../../Layouts/admin/AdminLayout';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  const [isEditing, setIsEditing] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageType, setImageType] = useState(''); // 'profile' or 'cover'
  
  // Données du profil pour une app de cartoons
  const [profileData, setProfileData] = useState({
    coverPhoto: 'https://www.gannett-cdn.com/-mm-/c4ff156bfef11d468e2b233282a16eb1303f6aa4/c=0-39-768-473/local/-/media/2018/05/22/CarolinaGroup/Greenville/636625918491296957-Fireflies-2-1-.jpg?width=3200&height=1680&fit=crop',
    profilePhoto: 'https://www.nautiljon.com/images/actualite/00/59/1486721458562_image.jpg',
    
    username: 'cartoon_lover',
    fullName: 'zineb elgaout',
    email: 'zineb.elgaout@example.com',
    country: 'New York, USA',
    birthDate: '2004-05-02',
    role: 'Admin',
   
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
      critiques: 20,
      votes: 10,
      favoris: 15,
    }
  });

  const [editForm, setEditForm] = useState({ ...profileData });

  // Gérer les changements dans le formulaire d'édition
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value
    });
  };

  // Gérer les changements des catégories préférées
  const handleGenreChange = (index, value) => {
    const newGenres = [...editForm.favoriteGenres];
    newGenres[index] = value;
    setEditForm({
      ...editForm,
      favoriteGenres: newGenres
    });
  };

  // Ajouter une nouvelle catégorie
  const addGenre = () => {
    setEditForm({
      ...editForm,
      favoriteGenres: [...editForm.favoriteGenres, '']
    });
  };

  // Supprimer une catégorie
  const removeGenre = (index) => {
    const newGenres = editForm.favoriteGenres.filter((_, i) => i !== index);
    setEditForm({
      ...editForm,
      favoriteGenres: newGenres
    });
  };

  // Sauvegarder les modifications
  const handleSave = () => {
    setProfileData(editForm);
    setIsEditing(false);
    // Ici, vous ajouteriez normalement un appel API pour sauvegarder les données
  };

  // Annuler les modifications
  const handleCancel = () => {
    setEditForm({ ...profileData });
    setIsEditing(false);
  };

  // Ouvrir le modal de modification d'image
  const openImageModal = (type) => {
    setImageType(type);
    setShowImageModal(true);
  };

  // Changer l'image (simulé)
  const changeImage = (url) => {
    if (imageType === 'profile') {
      setEditForm({
        ...editForm,
        profilePhoto: url
      });
    } else {
      setEditForm({
        ...editForm,
        coverPhoto: url
      });
    }
    setShowImageModal(false);
  };

  return (
    <AdminLayout>
      {/* Photo de couverture avec bouton d'édition */}
      <div 
        className="h-56 bg-cover bg-center relative group"
        style={{ backgroundImage: `url(${isEditing ? editForm.coverPhoto : profileData.coverPhoto})` }}
      >
        {isEditing && (
          <button
            onClick={() => openImageModal('cover')}
            className="absolute top-4 right-4 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-100 transition-all"
            title="Changer la photo de couverture"
          >
            <FiCamera size={18} />
          </button>
        )}
        
        {/* Conteneur photo de profil avec fond gris */}
        <div className="absolute -bottom-16 left-4 group">
          {/* Fond gris circulaire (plus grand que la photo) */}
          <div className="absolute -inset-4 bg-gray-900 rounded-full z-0"></div>
          
          {/* Photo de profil par dessus */}
          <div className="relative">
            <img 
              src={isEditing ? editForm.profilePhoto : profileData.profilePhoto} 
              alt="Profile" 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-gray-900 relative z-10"
            />
            {isEditing && (
              <button
                onClick={() => openImageModal('profile')}
                className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-100 transition-all z-20"
                title="Changer la photo de profil"
              >
                <FiCamera size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Bouton d'édition du profil */}
        <div className="absolute top-4 right-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              <FiEdit2 size={16} className="mr-2" />
              Modifier le profil
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                Enregistrer
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                Annuler
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Contenu du profil */}
      <div className="px-4 md:px-8 pt-20 pb-8">
        {/* En-tête avec nom et titre */}
        <div className="mb-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nom complet</label>
                <input
                  type="text"
                  name="fullName"
                  value={editForm.fullName}
                  onChange={handleInputChange}
                  className="w-full md:w-1/2 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nom d'utilisateur</label>
                <input
                  type="text"
                  name="username"
                  value={editForm.username}
                  onChange={handleInputChange}
                  className="w-full md:w-1/2 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {profileData.fullName}
              </h1>
              <p className="text-base md:text-lg text-purple-400">@{profileData.username}</p>
            </>
          )}
        </div>

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Colonne gauche (1/4 de largeur) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Informations personnelles */}
            <div className="bg-gray-800 p-4 md:p-5 rounded-lg">
              <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">Informations</h3>
              <div className="space-y-3">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Pays/Ville</label>
                      <input
                        type="text"
                        name="country"
                        value={editForm.country}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Date de naissance</label>
                      <input
                        type="date"
                        name="birthDate"
                        value={editForm.birthDate}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>

            {/* Genres préférés */}
            <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Catégories préférées</h3>
                {isEditing && (
                  <button
                    onClick={addGenre}
                    className="text-purple-400 hover:text-purple-300 text-sm"
                  >
                    + Ajouter
                  </button>
                )}
              </div>
              {isEditing ? (
                <div className="space-y-2">
                  {editForm.favoriteGenres.map((genre, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={genre}
                        onChange={(e) => handleGenreChange(index, e.target.value)}
                        className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm"
                      />
                      <button
                        onClick={() => removeGenre(index)}
                        className="ml-2 text-red-400 hover:text-red-300"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
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
              )}
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

      {/* Modal de changement d'image */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                Changer la {imageType === 'profile' ? 'photo de profil' : 'photo de couverture'}
              </h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-300">Choisissez une nouvelle image :</p>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Options d'images prédéfinies */}
                {imageType === 'profile' ? (
                  <>
                    <div 
                      className="cursor-pointer border-2 border-gray-600 rounded-lg overflow-hidden hover:border-purple-500 transition-colors"
                      onClick={() => changeImage('https://www.nautiljon.com/images/actualite/00/59/1486721458562_image.jpg')}
                    >
                      <img 
                        src="https://www.nautiljon.com/images/actualite/00/59/1486721458562_image.jpg" 
                        alt="Option 1" 
                        className="w-full h-24 object-cover"
                      />
                    </div>
                    <div 
                      className="cursor-pointer border-2 border-gray-600 rounded-lg overflow-hidden hover:border-purple-500 transition-colors"
                      onClick={() => changeImage('https://static.hitek.fr/img/actualite/2017/08/fb_avatar.png')}
                    >
                      <img 
                        src="https://static.hitek.fr/img/actualite/2017/08/fb_avatar.png" 
                        alt="Option 2" 
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div 
                      className="cursor-pointer border-2 border-gray-600 rounded-lg overflow-hidden hover:border-purple-500 transition-colors"
                      onClick={() => changeImage('https://www.gannett-cdn.com/-mm-/c4ff156bfef11d468e2b233282a16eb1303f6aa4/c=0-39-768-473/local/-/media/2018/05/22/CarolinaGroup/Greenville/636625918491296957-Fireflies-2-1-.jpg?width=3200&height=1680&fit=crop')}
                    >
                      <img 
                        src="https://www.gannett-cdn.com/-mm-/c4ff156bfef11d468e2b233282a16eb1303f6aa4/c=0-39-768-473/local/-/media/2018/05/22/CarolinaGroup/Greenville/636625918491296957-Fireflies-2-1-.jpg?width=3200&height=1680&fit=crop" 
                        alt="Option 1" 
                        className="w-full h-24 object-cover"
                      />
                    </div>
                    <div 
                      className="cursor-pointer border-2 border-gray-600 rounded-lg overflow-hidden hover:border-purple-500 transition-colors"
                      onClick={() => changeImage('https://wallpaperaccess.com/full/1268168.jpg')}
                    >
                      <img 
                        src="https://wallpaperaccess.com/full/1268168.jpg" 
                        alt="Option 2" 
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  </>
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors">
                  Télécharger une image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>  
  );
};

export default ProfilePage;