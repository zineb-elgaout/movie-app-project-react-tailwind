import { useState, useMemo } from 'react';

const useUserFilter = (users) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [nationalityFilter, setNationalityFilter] = useState('');
    const [showOnlyCreatedByAdmin, setShowOnlyCreatedByAdmin] = useState(false);
    const [createdByAdminUsers, setCreatedByAdminUsers] = useState([]);

    const uniqueRoles = useMemo(() => {
        return [...new Set(users.map(user => user.role))];
    }, [users]);

    const filteredUsers = useMemo(() => {
        let result = [...users];
        
        // Si le filtre "Créés par admin" est activé
        if (showOnlyCreatedByAdmin && createdByAdminUsers.length > 0) {
            const createdIds = createdByAdminUsers.map(u => u.id);
            result = result.filter(user => createdIds.includes(user.id));
        }
        
        // Applique les autres filtres
        return result.filter(user => {
            const matchesSearch = ['firstName', 'lastName', 'email', 'role'].some(prop => 
                user[prop]?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            const matchesRole = roleFilter === 'all' || user.role === roleFilter;
            const matchesNationality = !nationalityFilter || 
                user.nationality?.toLowerCase().includes(nationalityFilter.toLowerCase());
            
            return matchesSearch && matchesRole && matchesNationality;
        });
    }, [users, searchTerm, roleFilter, nationalityFilter, showOnlyCreatedByAdmin, createdByAdminUsers]);

    return {
        searchTerm,
        setSearchTerm,
        roleFilter,
        setRoleFilter,
        nationalityFilter,
        setNationalityFilter,
        uniqueRoles,
        filteredUsers,
        showOnlyCreatedByAdmin,
        setShowOnlyCreatedByAdmin,
        setCreatedByAdminUsers
    };
};

export default useUserFilter;