import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import Loading from '../../Loading';
import ErrorMessage from '../../ErrorMessage';
import Button from "../../ui/Button";
import getRoleBadge from "../../ui/RoleBagde";
import { updateUser } from '../../../../services/userService';

const UpdateUser = ({ onClose, onUserUpdated, user }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',      
        nationality: '',
        role: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 1. Initialisation correcte de formData au montage / changement de "user"
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                password: '',  // Ne pas préremplir le mot de passe (sécurité)
                nationality: user.nationality || '',
                role: user.role || ''
            });
        }
    }, [user]);

    // 2. Gestion standard du changement des champs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 3. Validation des champs avec trim() pour éviter espaces vides
    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
        if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
        if (!formData.email.trim()) newErrors.email = 'Email requis';
        if (!formData.nationality.trim()) newErrors.nationality = 'Nationalité requise';
        if (!formData.role.trim()) newErrors.role = 'Rôle requis';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 4. Soumission du formulaire avec protection contre mot de passe vide
   
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!user || !user.id) {
        setError("Impossible de récupérer l'identifiant de l'utilisateur.");
        return;
    }

    setIsSubmitting(true);
    setError(null);

    const dataToSend = { ...formData };

    if (!formData.password || !formData.password.trim()) {
        delete dataToSend.password;
    }

        try {
            await updateUser(user.id, dataToSend);
            onUserUpdated();
            onClose();
        } catch (err) {
            console.error("Erreur lors de la modification de l'utilisateur:", err);
            setError(err.response?.data?.message || err.message || "Erreur serveur");
        } finally {
            setIsSubmitting(false);
        }
};


    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md relative"
        >
            <div className="p-6 overflow-y-auto max-h-[80vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Modifier un utilisateur</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {errors.server && (
                    <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg text-sm">
                        {errors.server}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Prénom */}
                        <div>
                            <label className="block text-gray-300 mb-2">Prénom</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500'} text-white`}
                            />
                            {errors.firstName && <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>}
                        </div>

                        {/* Nom */}
                        <div>
                            <label className="block text-gray-300 mb-2">Nom</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500'} text-white`}
                            />
                            {errors.lastName && <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500'} text-white`}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                        </div>

                        {/* Nationalité */}
                        <div>
                            <label className="block text-gray-300 mb-2">Nationalité</label>
                            <input
                                type="text"
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 ${errors.nationality ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500'} text-white`}
                            />
                            {errors.nationality && <p className="mt-1 text-sm text-red-400">{errors.nationality}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-300 mb-2">Nouveau mot de passe</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Laissez vide pour ne pas changer"
                                className={`w-full px-4 py-2 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500'} text-white`}
                            />
                        </div>

                        {/* Rôle */}
                        <div>
                            <label className="block text-gray-300 mb-2">Rôle</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['admin', 'editor', 'client'].map((role) => (
                                    <div key={role} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`role-${role}`}
                                            name="role"
                                            value={role}
                                            checked={formData.role === role}
                                            onChange={handleChange}
                                            className="hidden peer"
                                        />
                                        <label
                                            htmlFor={`role-${role}`}
                                            className={`w-full px-3 py-2 text-center rounded-lg cursor-pointer transition-colors ${getRoleBadge(role)} peer-checked:ring-2 peer-checked:ring-purple-500`}
                                        >
                                            {role}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.role && <p className="mt-1 text-sm text-red-400">{errors.role}</p>}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end space-x-3">
                        <Button
                            type="button"
                            onClick={onClose}
                            variant="secondary"
                            className="px-6"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6"
                        >
                            {isSubmitting ? 'En cours...' : 'Mettre à jour'}
                        </Button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default UpdateUser;
