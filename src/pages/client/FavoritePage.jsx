import React, { useEffect, useState } from "react";
import { getFavorites } from "../../../services/favoriteService"; 
import Cartoons from "../../components/client/Cartoons"
import NavBar from "../../Layouts/client/NavBar";

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getFavorites();
        console.log("Données brutes reçues:", data);

        // Vérifier si data existe et est un tableau
        if (!data || !Array.isArray(data)) {
          console.warn("Les données reçues ne sont pas un tableau:", data);
          setFavorites([]);
          return;
        }

        // Si le tableau est vide
        if (data.length === 0) {
          console.log("Aucun favori trouvé");
          setFavorites([]);
          return;
        }

        // Vérifier la structure des données
        const firstItem = data[0];
        if (!firstItem.cartoon) {
          console.warn("Structure de données inattendue:", firstItem);
          setFavorites([]);
          return;
        }

        // Transformer la réponse pour n'avoir que les cartoons
        const cartoonsOnly = data
          .map(fav => fav.cartoon)
          .filter(cartoon => cartoon != null); // Filtrer les valeurs null

        console.log("Cartoons après transformation:", cartoonsOnly);
        setFavorites(cartoonsOnly);
        
      } catch (err) {
        console.error("Erreur complète:", err);
        const errorMessage = err.response?.data?.message || 
                           err.message || 
                           "Erreur lors du chargement des favoris";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <div className="text-white text-center py-20">Chargement...</div>;
  
  if (error) return (
    <div className="text-red-500 text-center py-20">
      Erreur: {error}
      <br />
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
      >
        Réessayer
      </button>
    </div>
  );
  
  if (favorites.length === 0) {
    return (
        <div className="min-h-screen bg-black">
    <NavBar />
      <div className="text-white text-center py-20">
        Aucun favori trouvé
        <br />
        <span className="text-gray-400 text-sm">
          Ajoutez des cartoons à vos favoris pour les voir ici
        </span>
      </div>
      <div/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
    <NaBar />
    <div className="min-h-screen bg-gray-900 text-white px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Mes Favoris</h1>
      <p className="text-center text-gray-400 mb-8">
        {favorites.length} cartoon{favorites.length > 1 ? 's' : ''} favori{favorites.length > 1 ? 's' : ''}
      </p>
      
      <Cartoons cartoons={favorites} />
    </div>
    <div/>
    </div>
  );
}