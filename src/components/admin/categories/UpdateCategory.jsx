import React, { useState, useRef, useEffect } from 'react';
import { updateCategory } from '../../../../services/categoryService';

const UpdateCategory = ({ onClose, category, fetchCategories }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  // Pré-remplissage des données
  useEffect(() => {
    if (category) {
      setFormData({
        title: category.title || '',
        description: category.subtitle || '',
        image: category.image || null
      });
    }
  }, [category]);

  // Fermer au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.title) {
      alert('Le titre est obligatoire !');
      setIsSubmitting(false);
      return;
    }

    const updatedImage =
      formData.image instanceof File
        ? URL.createObjectURL(formData.image)
        : formData.image;

    const updatedCategory = {
      title: formData.title,
      subtitle: formData.description,
      image: updatedImage
    };

    try {
      await updateCategory(category.id, updatedCategory);
      await fetchCategories(); // 🔁 Mise à jour automatique
      alert(`Catégorie "${formData.title}" mise à jour avec succès !`);
      onClose();
    } catch (err) {
      console.error('Erreur lors de la mise à jour :', err);
      alert('Erreur lors de la mise à jour de la catégorie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        ref={formRef}
        className="max-w-md w-full mx-4 p-6 bg-white rounded-xl shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Modifier Catégorie</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            aria-label="Fermer"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Titre */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Titre *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Description optionnelle"
            />
          </div>

          {/* Image */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Image</label>

            {typeof formData.image === 'string' && (
              <img
                src={formData.image}
                alt="Image actuelle"
                className="w-full h-32 object-cover rounded-md mb-4"
              />
            )}

            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full border-2 border-dashed border-gray-300 hover:border-pink-400 rounded-lg cursor-pointer transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                  <svg
                    className="w-8 h-8 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm text-gray-500 text-center">
                    {formData.image instanceof File
                      ? formData.image.name
                      : 'Cliquez pour téléverser une nouvelle image'}
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              className={`px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  En cours...
                </>
              ) : (
                'Mettre à jour'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
