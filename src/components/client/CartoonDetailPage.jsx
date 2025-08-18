import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { getCartoonById, getAllCartoons } from "../../../services/cartoonService";
import Navbar from "./NavBar";
import KeywordsMarquee from "../ui/KeywordsMarquee";
import Cartoons from "./Cartoons";
import { Link } from "react-router-dom";

export default function CartoonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cartoon, setCartoon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedCartoons, setRelatedCartoons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [error, setError] = useState(null);

  const openTrailer = (trailerUrl) => {
    setSelectedTrailer(trailerUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTrailer(null);
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    const videoId = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // Fetch cartoon details
  const fetchCartoon = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getCartoonById(id);
      setCartoon(res.data);

      // Fetch all cartoons to calculate related cartoons
      const allRes = await getAllCartoons();
      const related = allRes.data.filter(
        (c) => c.categoryId === res.data.categoryId && c.id !== res.data.id
      );
      setRelatedCartoons(related);

    } catch (err) {
      console.error("Error fetching cartoon details", err);
      setError("Erreur lors du chargement du cartoon");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCartoon();
  }, [fetchCartoon]);

  if (loading) return <div className="text-white text-center py-20">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;
  if (!cartoon) return <div className="text-white text-center py-20">Cartoon not found</div>;

  return (
    <div>
    <div className="relative min-h-screen text-white">
      <Navbar />

      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={cartoon.backImageUrl || cartoon.brandImageUrl}
          alt={cartoon.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative container mx-auto px-4 py-8 md:py-16 lg:py-20 min-h-screen flex flex-col-reverse md:flex-row items-start md:items-center justify-center gap-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 lg:gap-12 mx-auto w-full">
          <div className="flex flex-col space-y-4 md:space-y-5 justify-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
              {cartoon.title}
            </h1>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
              {cartoon.description}
            </p>

            <div className="flex flex-wrap">
              <div>
                <h3 className="text-lg font-semibold mr-7 my-2">Date de sortie</h3>
                <span className="bg-black bg-opacity-50 px-4 py-2 rounded-full text-sm">
                  {cartoon.releaseDate}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold my-2">Catégorie</h3>
                <span className="bg-black bg-opacity-50 px-4 py-2 rounded-full text-sm">
                  {cartoon.categoryTitle}
                </span>
              </div>
            </div>

            {/* Personnages principaux */}
            {cartoon.mainCharacters && (
              <>
                <h3 className="text-lg font-semibold">Personnages principaux</h3>
                <div className="flex flex-wrap gap-2">
                  {cartoon.mainCharacters.split(",").map((char, i) => (
                    <span key={i} 
                        className="bg-black bg-opacity-50 px-4 py-2 rounded-full text-sm">
                      {char.trim()}
                    </span>
                  ))}
                </div>
              </>
            )}

            {/* Boutons */}
            <div className="flex flex-wrap gap-4 pt-6">
                <button className="bg-purple-600 hover:bg-purple-900 px-6 py-3 rounded-lg font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                    />
                </svg>
                Ajouter aux favoris
                </button>

                <button
                onClick={() => openTrailer(cartoon.trailerUrl)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg font-semibold flex items-center"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                    />
                </svg>
                Voir la bande-annonce
                </button>
            </div>
            </div>
            </div>
          {/* Brand image style Hero */}

            <div className="hidden md:flex items-center justify-center align-top relative max-w-[400px]">
                <div className="absolute top-[-20px] right-[-20px] scale-95 z-0 hidden lg:block rotate-[-25deg]">
                    <img
                    src={cartoon.brandImageUrl}
                    alt="Brand background"
                    className="rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.8)] object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg"></div>
                </div>
                <div className="relative z-10 lg:rotate-[16deg]">
                    <img
                    src={cartoon.brandImageUrl}
                    alt="Brand"
                    className="rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.9)] object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
                </div>
            </div>
      </div>

      

      {/* Mots-clés en bas */}
      {cartoon.keywords && <KeywordsMarquee keywords={cartoon.keywords} />}

      {/* Modal Trailer */}
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
                src={getEmbedUrl(selectedTrailer)}
                title="Trailer Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      
    </div>
    {/* Section autres suggestions */}
{relatedCartoons.length > 0 && (
  <Link to="/cartoon/:id" >
  <div className="bg-black py-12 px-4 sm:px-6 lg:px-8">
    <div className="mx-auto">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Vous pourriez aussi aimer
        </h2>
      </div>
      
      <div className="relative">
        {/* Conteneur modifié pour le défilement horizontal comme Categories */}
        <div className="mb-12 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex space-x-6 w-max">
            {relatedCartoons.map((cartoon) => (
              <div 
                key={cartoon.id}
                className="relative bg-gray-800 rounded-xl p-5 w-64 hover:bg-gray-700 transition-all duration-300 hover:scale-105 cursor-pointer group flex-shrink-0"
              >
                {/* Contenu de votre cartoon ici - adaptez selon votre structure */}
                <img 
                  src={cartoon.backImageUrl} 
                  alt={cartoon.title} 
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium text-white text-lg group-hover:text-white">
                  {cartoon.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 py-1">
                  {cartoon.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Effet de dégradé sur les bords (optionnel) */}
        <div className="hidden md:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="hidden md:block absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/toontime" className="inline-flex items-center px-6 py-3 border border-gray-700 hover:border-purple-500 text-gray-300 hover:text-white rounded-lg transition-all duration-300 group">
          Voir plus de suggestions
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  </div>
  </Link>
)}

      </div>
  );

  
}
