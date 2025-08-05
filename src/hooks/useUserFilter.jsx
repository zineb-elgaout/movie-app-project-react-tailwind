
import { useState, useMemo } from 'react';

const useUserFilter = (users) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [nationalityFilter, setNationalityFilter] = useState('');

    // Récupère les rôles uniques pour les boutons de filtre
    const uniqueRoles = useMemo(() => {
        return [...new Set(users.map(user => user.role))];
    }, [users]);

    // Filtrage combiné
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = ['firstName', 'lastName', 'email', 'role'].some(prop => 
                user[prop]?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            const matchesRole = roleFilter === 'all' || user.role === roleFilter;
            const matchesNationality = !nationalityFilter || 
                user.nationality?.toLowerCase().includes(nationalityFilter.toLowerCase());
            
            return matchesSearch && matchesRole && matchesNationality;
        });
    }, [users, searchTerm, roleFilter, nationalityFilter]);

    return {
        searchTerm,
        setSearchTerm,
        roleFilter,
        setRoleFilter,
        nationalityFilter,
        setNationalityFilter,
        uniqueRoles,
        filteredUsers
    };
};

export default useUserFilter;