import { FaUserEdit, FaCog, FaHeart, FaHistory, FaBookmark, FaUsers, FaCommentAlt } from 'react-icons/fa';
import { RiMovie2Fill, RiStarFill } from 'react-icons/ri';
import { FaPlay } from 'react-icons/fa';
import { GiAchievement } from 'react-icons/gi';
import AdminLayout from '../../Layouts/admin/AdminLayout';

const ProfilePage = () => {
  return (
    <AdminLayout>
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-purple-900/20 to-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center md:flex-row gap-8">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-purple-500 overflow-hidden">
                <img 
                  src="" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <FaUserEdit size={16} />
              </button>
            </div>

            {/* User Info */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-1">AnimeLover42</h1>
              <p className="text-purple-300 mb-4">Membre depuis 2022</p>
              <div className="flex gap-4 justify-center md:justify-start">
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition">
                  <FaCog /> <span>Paramètres</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Watched Stats */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition">
          <div className="flex items-center gap-3 mb-4">
            <RiMovie2Fill className="text-purple-400 text-2xl" />
            <h3 className="text-xl font-semibold">Animés Vus</h3>
          </div>
          <p className="text-4xl font-bold mb-2">147</p>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-gray-400 mt-2">65% de la collection</p>
        </div>

        {/* Favorites */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-pink-500 transition">
          <div className="flex items-center gap-3 mb-4">
            <FaHeart className="text-pink-400 text-2xl" />
            <h3 className="text-xl font-semibold">Favoris</h3>
          </div>
          <div className="flex gap-3">
            {['Attack on Titan', 'Spirited Away', 'Demon Slayer'].map((title, i) => (
              <div key={i} className="w-16 h-24 bg-gray-700 rounded-md overflow-hidden hover:scale-110 transition-transform">
                <img 
                  src={`https://placehold.co/100x150/1e1b4b/fff?text=${title.split(' ')[0]}`} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-yellow-500 transition">
          <div className="flex items-center gap-3 mb-4">
            <GiAchievement className="text-yellow-400 text-2xl" />
            <h3 className="text-xl font-semibold">Badges</h3>
          </div>
          <div className="flex gap-3 flex-wrap">
            {['Otaku LV.5', 'Ghibli Fan', 'Binge Watcher'].map((badge, i) => (
              <span key={i} className="px-3 py-1 bg-gray-700 rounded-full text-sm flex items-center gap-1">
                <RiStarFill className="text-yellow-400" /> {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Collections */}
      <div className="container mx-auto px-4 py-8">
        <div className="border-b border-gray-700 flex gap-6 mb-6">
          {['Ma Liste', 'Recommandations', 'Communauté'].map((tab, i) => (
            <button 
              key={i}
              className={`pb-3 px-1 font-medium ${i === 0 ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="group relative">
              <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
                <img 
                  src={`https://placehold.co/300x450/1e1b4b/fff?text=Anime${item}`} 
                  alt={`Anime ${item}`}
                  className="w-full h-full object-cover group-hover:opacity-70 transition-opacity"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full">
                  <FaPlay size={20} />
                </button>
              </div>
              <div className="mt-2">
                <h4 className="font-medium truncate">Titre Anime {item}</h4>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default ProfilePage;