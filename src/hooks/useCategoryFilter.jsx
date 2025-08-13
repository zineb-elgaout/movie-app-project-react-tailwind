import { useState, useMemo } from 'react';

export default function useCategoryFilter(categories = []) {
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [showOnlyCreatedByAdmin, setShowOnlyCreatedByAdmin] = useState(false);

    // Extraire les rôles uniques pour les filtres
    const uniqueRoles = useMemo(() => {
        const roles = new Set(categories.map(category => category.createdByRole));
        return Array.from(roles);
    }, [categories]);

    // Filtrer les catégories
    const filteredCategories = useMemo(() => {
        return categories.filter(category => {
            // Filtre par recherche
            const matchesSearch = 
                category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.createdByEmail.toLowerCase().includes(searchTerm.toLowerCase());
            
            // Filtre par rôle
            const matchesRole = 
                roleFilter === "all" || 
                category.createdByRole.toLowerCase() === roleFilter.toLowerCase();
            
            // Filtre "Créés par admin"
            const matchesCreatedByAdmin = 
                !showOnlyCreatedByAdmin || 
                (showOnlyCreatedByAdmin && category.createdByRole.toLowerCase() === "admin");
            
            return matchesSearch && matchesRole && matchesCreatedByAdmin;
        });
    }, [categories, searchTerm, roleFilter, showOnlyCreatedByAdmin]);

    return {
        searchTerm,
        setSearchTerm,
        roleFilter,
        setRoleFilter,
        showOnlyCreatedByAdmin,
        setShowOnlyCreatedByAdmin,
        uniqueRoles,
        filteredCategories
    };
}