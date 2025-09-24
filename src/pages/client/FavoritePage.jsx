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
        if (!data) {
          console.warn("Aucune donnée reçue");
          setFavorites([]);
          return;
        }

        // Vérifier si c'est un tableau
        if (!Array.isArray(data)) {
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

        // Vérifier la structure des données - s'adapter à votre DTO
        const firstItem = data[0];
        
        // Vérifier si la structure contient cartoon (comme dans votre DTO)
        if (firstItem.cartoon) {
          // Transformer la réponse pour n'avoir que les cartoons
          const cartoonsOnly = data
            .map(fav => fav.cartoon)
            .filter(cartoon => cartoon != null);
          
          console.log("Cartoons après transformation:", cartoonsOnly);
          setFavorites(cartoonsOnly);
        } else if (firstItem.cartoonId || firstItem.title) {
          // Si les données sont déjà des cartoons directement
          console.log("Données déjà au format cartoon:", data);
          setFavorites(data);
        } else {
          console.warn("Structure de données inattendue:", firstItem);
          setFavorites([]);
        }
        
      } catch (err) {
        console.error("Erreur complète:", err);
        const errorMessage = err.response?.data?.message || 
                           err.response?.data || 
                           err.message || 
                           "Erreur lors du chargement des favoris";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <div className="text-white text-center py-20">Chargement...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-black">
      <NavBar />
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <div className="min-h-screen bg-gray-900 text-white px-4 py-12 pt-20">
        <h1 className="text-3xl font-bold mb-8 text-center">Mes Favoris</h1>
        <p className="text-center text-gray-400 mb-8">
          {favorites.length} cartoon{favorites.length > 1 ? 's' : ''} favori{favorites.length > 1 ? 's' : ''}
        </p>
        
        <Cartoons cartoons={favorites} />
      </div>
    </div>
  );
}

