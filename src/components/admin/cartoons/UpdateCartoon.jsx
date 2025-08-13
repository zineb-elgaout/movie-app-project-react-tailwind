import React, { useState, useRef, useEffect } from 'react';
import { updateCartoon } from '../../../../services/cartoonService';
import { getTokenFromCookie } from '../../../../services/authService';
import Button from '../../ui/Button';
import ErrorMessage from '../../ErrorMessage';

export default function UpdateCartoon({ cartoon, onClose, fetchCartoons }) {
  const token = getTokenFromCookie();
  const modalRef = useRef();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    trailerUrl: '',
    brandImageUrl: '',
    backImageUrl: '',
    mainCharacters: '',
    releaseDate: '',
    categoryId: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pré-remplir le formulaire avec les données du cartoon
  useEffect(() => {
    if (cartoon) {
      setFormData({
        title: cartoon.title || '',
        description: cartoon.description || '',
        keywords: cartoon.keywords || '',
        trailerUrl: cartoon.trailerUrl || '',
        brandImageUrl: cartoon.brandImageUrl || '',
        backImageUrl: cartoon.backImageUrl || '',
        mainCharacters: cartoon.mainCharacters || '',
        releaseDate: cartoon.releaseDate || '',
        categoryId: cartoon.categoryId || 0
      });
    }
  }, [cartoon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await updateCartoon(cartoon.id, formData, token);
      await fetchCartoons();
      onClose();
    } catch (err) {
      setError(err.message || "Erreur lors de la mise à jour du cartoon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        ref={modalRef}
        className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Modifier le cartoon</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors"
            aria-label="Fermer"
          >
            &times;
          </button>
        </div>

        {error && <ErrorMessage message={error} className="mb-4" />}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Titre & mots-clés */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Titre *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Mots-clés</label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              required
            />
          </div>

          {/* Trailer & personnages */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">URL du trailer</label>
              <input
                type="url"
                name="trailerUrl"
                value={formData.trailerUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Personnages principaux</label>
              <input
                type="text"
                name="mainCharacters"
                value={formData.mainCharacters}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">URL image marque</label>
              <input
                type="text"
                name="brandImageUrl"
                value={formData.brandImageUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">URL image arrière-plan</label>
              <input
                type="text"
                name="backImageUrl"
                value={formData.backImageUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Date de sortie *</label>
            <input
              type="text"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              required
            />
          </div>

          {/* ID de catégorie (peut être caché si nécessaire) */}
          <input 
            type="hidden" 
            name="categoryId" 
            value={formData.categoryId} 
          />

          {/* Boutons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className={`px-5 py-2.5 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : 'Mettre à jour'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}