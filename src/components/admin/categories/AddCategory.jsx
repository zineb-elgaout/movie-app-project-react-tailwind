import React, { useState, useRef, useEffect } from 'react';
import { createCategory } from '../../../../services/categoryService';

const AddCategory = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        const interactiveSelectors = [
          'input', 'button', 'textarea', 'label', '[role="button"]', 'svg', 'path'
        ];
        const isInteractive = interactiveSelectors.some(selector =>
          event.target.closest(selector)
        );
        if (!isInteractive) {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.title) {
      alert("Le titre est obligatoire !");
      setIsSubmitting(false);
      return;
    }

    const newCategory = {
      title: formData.title,
      description: formData.description || ''
    };

    try {
      await createCategory(newCategory);
      alert(`Catégorie "${formData.title}" créée avec succès !`);
      onClose();
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
      alert("Erreur lors de la création de la catégorie.");
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
        className="max-w-md w-full mx-4 p-6 bg-white rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Créer une Catégorie</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            aria-label="Fermer"
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Titre *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Nom de la catégorie"
              required
            />
          </div>
          
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows="3"
              placeholder="Description optionnelle"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg"
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              className={`px-5 py-2.5 text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 ${isSubmitting ? 'opacity-75' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Création...' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
