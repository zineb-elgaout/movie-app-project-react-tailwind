import React, { useEffect, useState } from "react";
import { getFavorites } from "../../../services/favoriteService"; 
import Cartoons from "../../components/client/Cartoons"

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const data = await getFavorites();
        setFavorites(data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des favoris");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <div className="text-white text-center py-20">Chargement...</div>;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;
  if (favorites.length === 0)
    return <div className="text-white text-center py-20">Aucun favori trouvé</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Mes Favoris</h1>
      
      <Cartoons cartoons={favorites} />
    </div>
  );
}
