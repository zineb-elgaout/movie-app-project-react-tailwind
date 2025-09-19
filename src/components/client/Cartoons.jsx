import {useState }from "react";
import { useNavigate } from "react-router-dom";
import {  FaHeart, FaHeartCircleBolt, FaHeartCircleCheck } from "react-icons/fa6";

export default function Cartoons({ cartoons }) {

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
    <div className="pyb-12   bg-black">
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
              <div className="flex flex-col sm:flex-col  space-y-2 sm:space-y-0 py-3 w-full gap-2">
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
              <div className="absolute top-2 right-2 flex flex-col gap-2 items-end w-full">
              <div className=" bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {item.categoryTitle}
              </div>
              <div className="text-red-600 "><FaHeartCircleCheck className="size-6"/></div>

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
