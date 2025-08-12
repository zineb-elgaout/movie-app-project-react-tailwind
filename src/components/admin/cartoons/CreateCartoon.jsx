import React, { useState } from "react";
import Button from "../../ui/Button";
import ErrorMessage from "../../ErrorMessage";
import { createCartoon } from "../../../../services/cartoonService";
import {getTokenFromCookie} from "../../../../services/authService";

export default function CreateCartoon({ onClose }) {
  const { token } = getTokenFromCookie();

  // État du formulaire
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    keywords: "",
    trailerUrl: "",
    countFavoris: 0,
    countVote: 0,
    countComments: 0,
    brandImageUrl: "",
    backImageUrl: "",
    categoryId: "",
    mainCharacters: "",
    releaseDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Gestion du changement d'input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("count") || name === "categoryId" ? Number(value) : value,
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createCartoon(formData, token);
      onClose(); // ferme le form et recharge la liste
    } catch (err) {
      setError(err.message || "Erreur lors de la création du cartoon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Ajouter un nouveau cartoon</h2>

      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Ligne 1 */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Titre"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="keywords"
            placeholder="Mots-clés (séparés par virgule)"
            value={formData.keywords}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

        {/* Ligne 2 */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="url"
            name="trailerUrl"
            placeholder="URL du trailer"
            value={formData.trailerUrl}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="mainCharacters"
            placeholder="Personnages principaux"
            value={formData.mainCharacters}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Ligne 3 */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="brandImageUrl"
            placeholder="URL image marque"
            value={formData.brandImageUrl}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="backImageUrl"
            placeholder="URL image arrière-plan"
            value={formData.backImageUrl}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Ligne 4 : Catégorie et Date */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="categoryId"
            placeholder="ID de la catégorie"
            value={formData.categoryId}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Ligne 5 : Compteurs */}
        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            name="countFavoris"
            placeholder="Favoris"
            value={formData.countFavoris}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="countVote"
            placeholder="Votes"
            value={formData.countVote}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="countComments"
            placeholder="Commentaires"
            value={formData.countComments}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Boutons */}
        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "En cours..." : "Ajouter"}
          </Button>
        </div>
      </form>
    </div>
  );
}
