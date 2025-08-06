import { useState } from 'react';
import { FiInstagram, FiMail, FiMapPin, FiCalendar, FiAward, FiBook ,FiMessageSquare} from 'react-icons/fi';
import { FaDiscord, FaGithub, FaLinkedin } from 'react-icons/fa';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('favorites');

  // Données du profil enrichies
  const profileData  = {
  coverPhoto: 'https://images.unsplash.com/photo-1535392432937-a27c34c09103?q=80&w=2232&auto=format&fit=crop',
  profilePhoto: 'https://images.unsplash.com/photo-1603415526960-f8f0f2c8cfb2?q=80&w=2080&auto=format&fit=crop',
  
  username: 'cinefan_jd',
  fullName: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  country: 'Paris, France',
  birthDate: '1990-03-15',

  bio: `Cinéphile passionné depuis toujours, je partage mes critiques, mes recommandations et mes coups de cœur sur cette plateforme. J'apprécie autant les classiques que les nouveautés, avec une préférence pour le cinéma indépendant et les thrillers psychologiques.`,

  favoriteGenres: ['Thriller', 'Science-fiction', 'Drame', 'Animation'],
  watchlist: [
    'Inception',
    'Parasite',
    'The Grand Budapest Hotel',
    'Spider-Man: Across the Spider-Verse'
  ],
  likedMovies: [
    'Interstellar',
    'Whiplash',
    'The Godfather',
    'Shutter Island'
  ],

  interests: ['Analyse de films', 'Rédaction de critiques', 'Réalisateurs indépendants', 'Festivals de cinéma'],

  skills: ['Rédaction', 'Montage vidéo', 'UI Design', 'Critique cinématographique'],

  socialLinks: {
    instagram: '',
    discord: 'discord',
    github: '', // remplacé par Letterboxd 
    linkedin: ''
  },

  stats: {
    reviewsPosted: 128,
    followers: 320,
    following: 85,
    moviesWatched: 512
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
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
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Contenu du profil */}
        <div className="px-8 pt-20 pb-8">
          {/* En-tête avec nom et titre */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {profileData.firstName} <span className="text-gray-700">{profileData.lastName}</span>
            </h1>
            <p className="text-lg text-blue-600">{profileData.title}</p>
          </div>

          {/* Grille principale */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Colonne gauche (1/4 de largeur) */}
            <div className="lg:col-span-1 space-y-6">
              {/* Liens sociaux */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Réseaux sociaux</h3>
                <div className="space-y-3">
                  <a 
                    href={profileData.socialLinks.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <FiInstagram className="w-5 h-5 mr-2" />
                    <span className="text-sm">Instagram</span>
                  </a>
                  <div className="flex items-center text-gray-700">
                    <FaDiscord className="w-5 h-5 mr-2 text-indigo-600" />
                    <span className="text-sm">{profileData.socialLinks.discord}</span>
                  </div>
                  <a 
                    href={profileData.socialLinks.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <FaGithub className="w-5 h-5 mr-2" />
                    <span className="text-sm">GitHub</span>
                  </a>
                  <a 
                    href={profileData.socialLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-blue-700 transition-colors"
                  >
                    <FaLinkedin className="w-5 h-5 mr-2" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Centres d'intérêt */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Centres d'intérêt</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-white text-gray-800 text-xs rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              
            </div>

            {/* Colonne droite (3/4 de largeur) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Informations personnelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Informations personnelles</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <FiMail className="w-4 h-4 mr-3 text-gray-400" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiMapPin className="w-4 h-4 mr-3 text-gray-400" />
                      <span>{profileData.country}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiCalendar className="w-4 h-4 mr-3 text-gray-400" />
                      <span>Né le {profileData.birthDate}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiAward className="w-4 h-4 mr-3 text-gray-400" />
                      <span>{profileData.stats.projects} Role</span>
                    </div>
                  </div>
                </div>

                {/* Statistiques */}
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Statistiques</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{profileData.stats.projects}+</p>
                      <p className="text-xs text-gray-500">Favoris</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{profileData.stats.followers}</p>
                      <p className="text-xs text-gray-500">Abonnés</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{profileData.stats.following}</p>
                      <p className="text-xs text-gray-500">Abonnements</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* À propos */}
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">À propos</h3>
                <p className="text-gray-700 leading-relaxed">{profileData.about}</p>
              </div>

              {/* Séparateur */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Onglets */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`px-6 py-2 font-medium rounded-md transition-colors flex items-center ${
                    activeTab === 'favorites' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FiBook className="mr-2" />
                  Favoris
                </button>
                <button
                  onClick={() => setActiveTab('comments')}
                  className={`px-6 py-2 font-medium rounded-md transition-colors flex items-center ${
                    activeTab === 'comments' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FiMessageSquare className="mr-2" />
                  Commentaires
                </button>
              </div>

              {/* Contenu des onglets */}
              <div className="bg-gray-50 rounded-lg p-6">
                {activeTab === 'favorites' ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Mes favoris</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Exemple d'éléments favoris - à remplacer par vos données */}
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                          <h4 className="font-medium text-gray-900">Cartoon favori {item}</h4>
                          <p className="text-sm text-gray-600 mt-1">Description des favori...</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Mes commentaires</h3>
                    <div className="space-y-4">
                      {/* Exemple de commentaires - à remplacer par vos données */}
                      {[1, 2].map((item) => (
                        <div key={item} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                          <div className="flex items-center mb-2">
                            <img 
                              src={profileData.profilePhoto} 
                              alt="Profile" 
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            <span className="font-medium">Sur le cartoon #{item}</span>
                          </div>
                          <p className="text-gray-700">"Ceci est un exemple de commentaire que j'ai laissé sur un catoon récent..."</p>
                          <p className="text-xs text-gray-500 mt-2">Posté le {new Date().toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;