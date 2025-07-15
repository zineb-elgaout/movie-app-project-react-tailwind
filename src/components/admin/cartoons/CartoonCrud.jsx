import React, { useState, useRef, useEffect } from 'react';
import { addCartoon, updateCartoon, deleteCartoon } from '../../../../services/cartoonService';
import { getCategories } from '../../../../services/categoryService';

const CartoonCrud = ({ onClose, cartoonToEdit }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    mainCaracter: '',
    description: '', 
    year: '', 
    categoryId: '',
    image: null,
    creator: ''
  });
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    // Charger les catégories
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error("Erreur lors du chargement des catégories:", err);
      }
    };

    loadCategories();

    // Si on reçoit un cartoon à éditer, remplir le formulaire
    if (cartoonToEdit) {
      setFormData({
        id: cartoonToEdit.id || '',
        title: cartoonToEdit.title || '',
        mainCaracter: cartoonToEdit.mainCaracter || '',
        description: cartoonToEdit.description || '', 
        year: cartoonToEdit.year || '', 
        categoryId: cartoonToEdit.categoryId || '',
        image: cartoonToEdit.image || null,
        creator: cartoonToEdit.creator || ''
      });
      setIsEditing(true);
    }
  }, [cartoonToEdit]);

  // Gestion du clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        const interactiveSelectors = [
          'input',
          'button',
          'textarea',
          'label',
          '[role="button"]',
          'svg',
          'path'
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.title || !formData.mainCaracter || !formData.categoryId) {
      alert("Le titre, le personnage principal et la catégorie sont obligatoires !");
      setIsSubmitting(false);
      return;
    }

    try {
      const cartoonData = {
        title: formData.title,
        mainCaracter: formData.mainCaracter,
        description: formData.description,
        year: formData.year,
        categoryId: formData.categoryId,
        creator: formData.creator,
        image: formData.image
      };

      if (isEditing) {
        await updateCartoon(formData.id, cartoonData);
        alert(`Dessin animé "${formData.title}" mis à jour avec succès !`);
      } else {
        await addCartoon(cartoonData);
        alert(`Dessin animé "${formData.title}" créé avec succès !`);
      }
      
      onClose();
    } catch (err) {
      console.error("Erreur lors de l'opération:", err);
      alert(`Erreur lors de ${isEditing ? 'la mise à jour' : 'la création'} du dessin animé, voir console pour détails.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer "${formData.title}" ?`)) {
      return;
    }

    try {
      await deleteCartoon(formData.id);
      alert(`Dessin animé "${formData.title}" supprimé avec succès !`);
      onClose();
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      alert("Erreur lors de la suppression du dessin animé, voir console pour détails.");
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
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Modifier un Dessin Animé' : 'Créer un Dessin Animé'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl transition-colors duration-200"
            aria-label="Fermer"
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Titre *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              placeholder="Titre du dessin animé"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Personnage Principal *</label>
            <input
              type="text"
              name="mainCaracter"
              value={formData.mainCaracter}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              placeholder="Personnage principal"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              rows="3"
              placeholder="Description du dessin animé"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Année</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="Année de sortie"
                min="1900"
                max="2100"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Créateur</label>
              <input
                type="text"
                name="creator"
                value={formData.creator}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="Créateur du dessin animé"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Catégorie *</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Image</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full border-2 border-dashed border-gray-300 hover:border-pink-400 rounded-lg cursor-pointer transition-colors duration-200">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                  <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p className="text-sm text-gray-500 text-center">
                    {formData.image 
                      ? typeof formData.image === 'string' 
                        ? 'Image actuelle' 
                        : formData.image.name 
                      : "Cliquez pour téléverser une image"}
                  </p>
                  {typeof formData.image === 'string' && (
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="mt-2 h-20 object-cover rounded"
                    />
                  )}
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

          <div className="flex justify-between">
            <div>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                  disabled={isSubmitting}
                >
                  Supprimer
                </button>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all"
                disabled={isSubmitting}
              >
                Annuler
              </button>
              <button
                type="submit"
                className={`px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all transform hover:scale-105 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEditing ? 'Mise à jour...' : 'Création...'}
                  </>
                ) : isEditing ? 'Mettre à jour' : 'Créer'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CartoonCrud;