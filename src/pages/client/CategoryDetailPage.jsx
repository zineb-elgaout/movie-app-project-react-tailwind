import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data pour les catégories
const mockCategories = [
  {
    id: 1,
    title: "Disney",
    description: "Découvrez tous les classiques et nouvelles productions Disney",
    cartoonsCount: 28,
    bannerImage: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Pixar",
    description: "Les films d'animation révolutionnaires de Pixar",
    cartoonsCount: 15,
    bannerImage: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Marvel",
    description: "L'univers cinématographique Marvel en animation",
    cartoonsCount: 12,
    bannerImage: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=400&fit=crop"
  }
];

// Mock data pour les cartoons Disney
const mockCartoons = [
  {
    id: 1,
    title: "Mickey Mouse",
    releaseDate: "1928-11-18",
    categoryTitle: "Disney",
    brandImageUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=300&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=BBgghnQF6E4",
    description: "Les aventures de la souris la plus célèbre du monde",
    rating: 4.8
  },
  {
    id: 2,
    title: "Le Roi Lion",
    releaseDate: "1994-06-15",
    categoryTitle: "Disney",
    brandImageUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=300&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=4sj1MT05lAA",
    description: "L'histoire de Simba, un jeune lion destiné à régner",
    rating: 4.9
  },
  {
    id: 3,
    title: "La Petite Sirène",
    releaseDate: "1989-11-17",
    categoryTitle: "Disney",
    brandImageUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=300&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=ZGZX5-PAwR8",
    description: "Ariel rêve de découvrir le monde des humains",
    rating: 4.7
  },
  {
    id: 4,
    title: "Aladdin",
    releaseDate: "1992-11-25",
    categoryTitle: "Disney",
    brandImageUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=300&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=QapaqcDucmg",
    description: "Un jeune homme pauvre découvre une lampe magique",
    rating: 4.6
  },
  {
    id: 5,
    title: "La Belle et la Bête",
    releaseDate: "1991-09-29",
    categoryTitle: "Disney",
    brandImageUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=300&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=tRlzmyveDHE",
    description: "Une jeune femme tombe amoureuse d'une bête mystérieuse",
    rating: 4.8
  },
  {
    id: 6,
    title: "Toy Story",
    releaseDate: "1995-11-22",
    categoryTitle: "Disney",
    brandImageUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=300&fit=crop",
    trailerUrl: "https://www.youtube.com/watch?v=KYz2wyBy3kc",
    description: "Les jouets prennent vie quand les humains ne regardent pas",
    rating: 4.9
  }
];

// Composant Categories avec navigation vers les détails
const CategoryDetailPage = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="mb-12 overflow-x-auto pb-4 hide-scrollbar">
      <div className="flex space-x-4 w-max px-4">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="relative bg-gray-800 rounded-xl p-5 w-48 hover:bg-gray-700 transition-all duration-300 hover:scale-105 cursor-pointer group"
          >
            <div className="space-y-2">
              <h3 className="font-medium text-white text-lg group-hover:text-white w-full block">
                {category.title}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2 py-2">
                {category.description}
              </p>
              <div className="absolute bottom-4 right-4">
                <button className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full hover:bg-gray-700">
                  {category.cartoonsCount} titres
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant Cartoons (celui que vous avez fourni)
function Cartoons({ cartoons }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const navigate = useNavigate();

  const openTrailer = (trailerUrl) => {
    setSelectedTrailer(trailerUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTrailer(null);
  };

  const getEmbedUrl = (url) => {
    const videoId = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const navigateToDetails = (cartoonId) => {
    navigate(`/cartoon/${cartoonId}`);
  };

  return (
    <div className="py-12 bg-black">
      {/* Grille */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {cartoons.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-lg transition-all duration-300 transform hover:scale-105 hover:z-10 cursor-pointer"
          >
            {/* Image fixe même hauteur */}
            <div className="w-full h-[390px] bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={item.brandImageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlay noir total */}
            <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-start text-start p-4">
              <h3 className="text-white font-bold text-lg">{item.title}</h3>
              <p className="text-gray-400 text-sm">Sortie : {item.releaseDate}</p>

              {/* Boutons responsive */}
              <div className="flex flex-col sm:flex-col space-y-2 sm:space-y-0 py-3 w-full gap-2">
                {/* Bouton Trailer */}
                <button
                  onClick={() => openTrailer(getEmbedUrl(item.trailerUrl))}
                  className="bg-purple-600 hover:bg-purple-800 text-white px-3 py-2 rounded-lg font-semibold flex items-center justify-center text-xs sm:text-sm w-full sm:w-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Annonce
                </button>

                {/* Bouton Info */}
                <button 
                  onClick={() => navigateToDetails(item.id)}
                  className="bg-white bg-opacity-30 hover:bg-opacity-20 text-white px-3 py-2 rounded-lg font-semibold flex items-center justify-center text-xs sm:text-sm w-full sm:w-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Savoir plus
                </button>
              </div>

              {/* Badge catégorie */}
              <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {item.categoryTitle}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Voir plus */}
      <div className="mt-10 text-center">
        <button className="border border-gray-600 hover:border-purple-500 text-gray-300 hover:text-white px-6 py-2 rounded-lg transition-colors duration-300">
          Voir plus de contenus
        </button>
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
            {/* Bouton close avec z-index élevé */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-2xl z-50"
            >
              ✕
            </button>

            {/* Wrapper iframe avec z-index plus bas */}
            <div className="relative w-full h-0 pb-[56.25%] z-10">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={selectedTrailer}
                title="Trailer Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Composant de recherche
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher un cartoon..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pl-12"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </form>
  );
};

// Composant de fil d'ariane (breadcrumb)
const Breadcrumb = ({ items }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    if (path) navigate(path);
  };

  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="text-gray-400 mx-2">/</span>}
            {item.path ? (
              <button
                onClick={() => handleClick(item.path)}
                className={`text-sm ${index === items.length - 1 ? 'text-purple-400 font-medium' : 'text-gray-400 hover:text-white'}`}
              >
                {item.label}
              </button>
            ) : (
              <span className={`text-sm ${index === items.length - 1 ? 'text-purple-400 font-medium' : 'text-gray-400'}`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Page de détail de catégorie
const CategoryDetail = ({ categoryId }) => {
  const category = mockCategories.find(cat => cat.id === parseInt(categoryId));
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCartoons, setFilteredCartoons] = useState(mockCartoons);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = mockCartoons.filter(cartoon => 
        cartoon.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCartoons(filtered);
    } else {
      setFilteredCartoons(mockCartoons);
    }
  };

  if (!category) {
    return <div className="p-12 text-white">Catégorie non trouvée</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Fil d'Ariane */}
      <Breadcrumb 
        items={[
          { label: "Accueil", path: "/" },
          { label: "Catégories", path: "/categories" },
          { label: category.title }
        ]} 
      />
      
      {/* Bannière de la catégorie */}
      <div className="relative rounded-xl overflow-hidden mb-8 h-64">
        <img 
          src={category.bannerImage} 
          alt={category.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-6">
          <div>
            <h1 className="text-4xl font-bold">{category.title}</h1>
            <p className="text-gray-300 mt-2 max-w-2xl">{category.description}</p>
            <div className="mt-4 flex items-center">
              <span className="bg-purple-600 text-white text-sm px-3 py-1 rounded-full">
                {category.cartoonsCount} titres
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche */}
      <SearchBar onSearch={handleSearch} />

      {/* Résultats de recherche */}
      {searchQuery && (
        <div className="mb-6">
          <p className="text-gray-400">
            {filteredCartoons.length} résultat(s) pour "{searchQuery}"
          </p>
        </div>
      )}

      {/* Cartoons de la catégorie */}
      <Cartoons cartoons={filteredCartoons} />
    </div>
  );
};

// Page principale des catégories
const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Catégories</h1>
      <Categories categories={mockCategories} />
    </div>
  );
};

// Exemple d'utilisation avec React Router
function App() {
  // Cette partie simulerait votre configuration de routeur
  const [currentView, setCurrentView] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fonctions de navigation simulées
  const navigateToCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentView('categoryDetail');
  };

  const navigateToCategories = () => {
    setCurrentView('categories');
  };

  return (
    <div>
      {currentView === 'categories' && <CategoriesPage />}
      {currentView === 'categoryDetail' && <CategoryDetail categoryId={selectedCategory} />}
    </div>
  );
}

export default App;