import React, { useState } from 'react';

const CartoonPage = () => {
  // Mock data pour le cartoon
  const cartoon = {
    id: 1,
    title: "Adventure Time",
    description: "Join Finn the Human and his best friend Jake the Dog on their surreal adventures in the post-apocalyptic Land of Ooo.",
    keywords: "Adventure, Fantasy, Comedy, Action",
    trailerUrl: "https://www.youtube.com/watch?v=JGZ4AIi7xKs",
    countFavoris: 12500,
    countVote: 8500,
    countComments: 3200,
    brandImageUrl: "https://i.imgur.com/R8V5ZxV.png",
    backImageUrl: "https://i.imgur.com/JQ1Y5wZ.jpg",
    mainCharacters: "Finn, Jake, Princess Bubblegum, Marceline, Ice King",
    releaseDate: "2010-04-05",
    createdByEmail: "creator@example.com",
    createdByRole: "Admin",
    createdAt: "2025-08-14T21:38:56.370Z",
    categoryId: 1,
    categoryTitle: "Animated Series"
  };

  // Mock data pour les commentaires
  const [comments, setComments] = useState([
    {
      id: 1,
      username: "CartoonFan22",
      avatar: "https://i.imgur.com/yXOvdOSs.jpg",
      comment: "This is hands down the best animated series of the decade! The character development is incredible.",
      rating: 5,
      date: "2025-08-10T14:30:00Z"
    },
    {
      id: 2,
      username: "AnimationLover",
      avatar: "https://i.imgur.com/1EWYCQhs.jpg",
      comment: "The world-building is phenomenal. Each episode brings something new and exciting.",
      rating: 4,
      date: "2025-08-12T09:15:00Z"
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    
    const comment = {
      id: comments.length + 1,
      username: "CurrentUser",
      avatar: "https://i.imgur.com/1EWYCQhs.jpg",
      comment: newComment,
      rating: userRating,
      date: new Date().toISOString()
    };
    
    setComments([...comments, comment]);
    setNewComment("");
    setUserRating(0);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="text-white">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {/* Image de fond */}
          <img
            src={cartoon.backImageUrl}
            alt={cartoon.title}
            className="w-full h-full object-cover"
          />

          {/* Effet foncé */}
          <div className="absolute inset-0 bg-black bg-opacity-80"></div>

          {/* Contenu centré */}
          <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 max-w-7xl w-full">

              {/* Texte + mots-clés */}
              <div className="flex flex-col justify-center space-y-6">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
                  {cartoon.title}
                </h2>
                <p className="text-base sm:text-lg lg:text-xl font-light max-w-lg">
                  {cartoon.description}
                </p>

                {/* Mots-clés */}
                {cartoon.keywords && (
                  <div className="flex flex-wrap gap-3 mb-6">
                    {cartoon.keywords.split(",").map((keyword, i) => (
                      <span
                        key={i}
                        className="bg-black bg-opacity-50 text-white px-5 py-2 rounded-full text-base"
                      >
                        {keyword.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Métadonnées */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm sm:text-base">
                  <div>
                    <p className="text-gray-400">Release Date</p>
                    <p>{new Date(cartoon.releaseDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Category</p>
                    <p>{cartoon.categoryTitle}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Main Characters</p>
                    <p className="truncate">{cartoon.mainCharacters}</p>
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex space-x-5">
                  <button className="bg-purple-600 hover:bg-purple-900 text-white px-7 py-3 rounded-lg font-semibold flex items-center text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Watch Trailer
                  </button>
                  <button 
                    onClick={toggleFavorite}
                    className={`${isFavorite ? 'bg-red-600' : 'bg-white bg-opacity-30'} hover:bg-opacity-20 text-white px-7 py-3 rounded-lg font-semibold flex items-center text-lg`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {isFavorite ? 'Favorited' : 'Add to Favorites'}
                  </button>
                </div>
              </div>

              {/* Image de Brand */}
              <div className="hidden md:flex items-end justify-end relative max-w-[400px]">
                <div className="absolute top-[-20px] right-[-20px] rotate-[-25deg] scale-95 z-0">
                  <img
                    src={cartoon.brandImageUrl}
                    alt="Brand background"
                    className="rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.8)] w-full h-auto max-h-[600px] object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg pointer-events-none"></div>
                </div>

                <div className="relative z-10 rotate-[16deg]">
                  <img
                    src={cartoon.brandImageUrl}
                    alt="Brand"
                    className="rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.9)] w-full h-auto max-h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-gray-900 py-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stats */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Favorites</span>
                  <span className="text-xl font-semibold">
                    {isFavorite ? cartoon.countFavoris + 1 : cartoon.countFavoris}
                    {isFavorite && <span className="text-green-500 ml-1">+1</span>}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Votes</span>
                  <span className="text-xl font-semibold">{cartoon.countVote}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Comments</span>
                  <span className="text-xl font-semibold">{comments.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Created By</span>
                  <span className="text-xl font-semibold">{cartoon.createdByEmail}</span>
                </div>
              </div>
            </div>

            {/* Trailer */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Trailer</h3>
              <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${cartoon.trailerUrl.split('v=')[1]}`}
                  title={`${cartoon.title} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Characters */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Main Characters</h3>
              <div className="grid grid-cols-2 gap-4">
                {cartoon.mainCharacters.split(",").map((character, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                      <span className="text-lg font-bold">{character.trim().charAt(0)}</span>
                    </div>
                    <span>{character.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-gray-950 py-16 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Comments ({comments.length})</h2>

          {/* Add Comment */}
          <div className="bg-gray-800 p-6 rounded-lg mb-12">
            <h3 className="text-xl font-semibold mb-4">Add your comment</h3>
            <textarea
              className="w-full bg-gray-700 rounded-lg p-4 text-white mb-4"
              rows="4"
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-3">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    className="text-2xl focus:outline-none"
                  >
                    {star <= userRating ? '★' : '☆'}
                  </button>
                ))}
              </div>
              <button
                onClick={handleAddComment}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
              >
                Post Comment
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-8">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-start space-x-4">
                  <img
                    src={comment.avatar}
                    alt={comment.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold">{comment.username}</h4>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-yellow-400">
                            {star <= comment.rating ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      {new Date(comment.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="mt-2">{comment.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartoonPage;