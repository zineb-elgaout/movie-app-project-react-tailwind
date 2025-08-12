// src/pages/cartoon/UpdateCartoon.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateCartoon } from "../../../../services/cartoonService";
import { getCartoonById } from "../../../../services/cartoonService";
import { getAllCategories } from "../../../../services/categoryService";

const UpdateCartoon = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cartoon, setCartoon] = useState({
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

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Charger les catégories pour le select
    getAllCategories(token)
      .then(setCategories)
      .catch(console.error);

    // Charger le cartoon existant
    getCartoonById(id, token)
      .then((data) => {
        setCartoon({
          title: data.title || "",
          description: data.description || "",
          keywords: data.keywords || "",
          trailerUrl: data.trailerUrl || "",
          countFavoris: data.countFavoris || 0,
          countVote: data.countVote || 0,
          countComments: data.countComments || 0,
          brandImageUrl: data.brandImageUrl || "",
          backImageUrl: data.backImageUrl || "",
          categoryId: data.categoryId || "",
          mainCharacters: data.mainCharacters || "",
          releaseDate: data.releaseDate ? data.releaseDate.split("T")[0] : "",
        });
      })
      .catch(console.error);
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCartoon({ ...cartoon, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCartoon(id, cartoon, token);
      alert("Cartoon mis à jour avec succès !");
      navigate("/cartoons");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du cartoon");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Modifier un Cartoon</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={cartoon.title}
          onChange={handleChange}
          placeholder="Titre"
          className="border p-2 w-full"
          required
        />
        <textarea
          name="description"
          value={cartoon.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full"
          required
        />
        <input
          name="keywords"
          value={cartoon.keywords}
          onChange={handleChange}
          placeholder="Mots-clés"
          className="border p-2 w-full"
        />
        <input
          name="trailerUrl"
          value={cartoon.trailerUrl}
          onChange={handleChange}
          placeholder="URL Bande-annonce"
          className="border p-2 w-full"
        />
        <input
          name="countFavoris"
          type="number"
          value={cartoon.countFavoris}
          onChange={handleChange}
          placeholder="Nombre de favoris"
          className="border p-2 w-full"
        />
        <input
          name="countVote"
          type="number"
          value={cartoon.countVote}
          onChange={handleChange}
          placeholder="Nombre de votes"
          className="border p-2 w-full"
        />
        <input
          name="countComments"
          type="number"
          value={cartoon.countComments}
          onChange={handleChange}
          placeholder="Nombre de commentaires"
          className="border p-2 w-full"
        />
        <input
          name="brandImageUrl"
          value={cartoon.brandImageUrl}
          onChange={handleChange}
          placeholder="URL image de marque"
          className="border p-2 w-full"
        />
        <input
          name="backImageUrl"
          value={cartoon.backImageUrl}
          onChange={handleChange}
          placeholder="URL image de fond"
          className="border p-2 w-full"
        />
        <select
          name="categoryId"
          value={cartoon.categoryId}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">-- Sélectionner une catégorie --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
        <input
          name="mainCharacters"
          value={cartoon.mainCharacters}
          onChange={handleChange}
          placeholder="Personnages principaux"
          className="border p-2 w-full"
        />
        <input
          name="releaseDate"
          type="date"
          value={cartoon.releaseDate}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default UpdateCartoon;
