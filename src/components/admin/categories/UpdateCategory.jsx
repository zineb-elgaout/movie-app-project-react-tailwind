import { useState, useRef, useEffect } from 'react';
import { updateCategory } from '../../../../services/categoryService';

const UpdateCategory = ({ onClose, category, fetchCategories, token }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  // Pré-remplissage des données
  useEffect(() => {
    if (category) {
      setFormData({
        title: category.title || '',
        description: category.description || ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.title) {
      alert('Le titre est obligatoire !');
      setIsSubmitting(false);
      return;
    }

    const updatedCategory = {
      title: formData.title,
      description: formData.description
    };

    try {
      await updateCategory(category.id, updatedCategory, token);
      await fetchCategories();
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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={formRef}
        className="max-w-md w-full mx-4 p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Modifier Catégorie</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors"
            aria-label="Fermer"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Titre */}
          <div className="mb-5">
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

          {/* Description */}
          <div className="mb-5">
            <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Description optionnelle"
            />
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors"
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              className={`px-5 py-2.5 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors ${
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