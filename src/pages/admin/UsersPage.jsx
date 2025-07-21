import React from "react";
import {motion} from 'framer-motion';
import AdminLayout from "../../Layouts/admin/AdminLayout";
import Header from "../../components/ui/Header";
import { useState } from 'react';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import GlobalSearch from "../../components/ui/GlobalSearch";
import useSearch from "../../hooks/useSearch";
import Button from "../../components/ui/Button";
import getRoleBadge from "../../components/ui/RoleBagde";
import useUsers from "../../hooks/useUsers";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

export default function UsersPage() {
  const { users , loading, error, fetchUsers } = useUsers();
  const {
        searchTerm,
        setSearchTerm,
        filteredData: filteredUsers
    } = useSearch(users, ['firstName', 'lastName', 'email', 'role']);

    

    if (loading) { return (<Loading />)};
    if(error) return (<ErrorMessage message={error} />) ; 

    

 
     return(
        <>
        <AdminLayout>


        <section className="px-4 sm:px-6 py-8 bg-gray-900 min-h-screen">
            <div className="max-w-7xl mx-auto">

                <Header
                    header={{
                        prefix: 'Gestion des',
                        title: 'Utilisateurs',
                        subtitle: `Vous pouvez créer , chercher , modifier , ou supprimer un utilisateur ! `
                    }}
                />

            </div>
            <div className="max-w-7xl  flex justify-center my-2">
                <GlobalSearch
                    placeholder="Rechercher ..."  
                    delay={500}                      
                    onSearch={(term) => {}}         
                    className="mb-4"                 
                    initialValue=""              
                    showClear={false}                
                />
            </div>
            
            <div className=" flex justify-end">
                <Button>
                    
                     + Nouveau Utilisateur
                </Button>
            
            </div>

            {/* Users Table */}
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden my-5">
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-gray-700">
                    <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-300">Utilisateur</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-300">Email</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-300">Nationalité</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-300">Rôle</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-750 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-white">
                            <div className="flex items-center gap-3">
                            <img 
                                src={user.avatar} 
                                alt={`${user.firstName} ${user.lastName}`} 
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <div className="font-medium">{user.firstName} {user.lastName}</div>
                            </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-300">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-300">{user.nationality}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getRoleBadge(user.role)}`}>
                            {user.role}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex justify-end gap-2">
                            <button 
                                className="p-2 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-gray-700 transition-colors"
                                title="Voir"
                            >
                                <FiEye size={18} />
                            </button>
                            <button 
                                className="p-2 rounded-full text-gray-400 hover:text-purple-400 hover:bg-gray-700 transition-colors"
                                title="Modifier"
                            >
                                <FiEdit size={18} />
                            </button>
                            <button 
                                className="p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors"
                                title="Supprimer"
                                onClick={() => deleteUser(user.id)}
                            >
                                <FiTrash2 size={18} />
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                        Aucun utilisateur trouvé
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
            </div>

            {/* Mobile Cards (hidden on desktop) */}
            <div className="mt-6 grid gap-4 md:hidden">
            {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                <div key={user.id} className="bg-gray-800 rounded-lg p-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-3 text-white">
                    <img 
                        src={user.avatar} 
                        alt={`${user.firstName} ${user.lastName}`} 
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <div className="font-medium">{user.firstName} {user.lastName}</div>
                    </div>
                    </div>
                    
                    <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Email:</span>
                        <span className="text-gray-300">{user.email}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Rôle:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getRoleBadge(user.role)}`}>
                        {user.role}
                        </span>
                    </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-700">
                    <button className="p-2 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-gray-700 transition-colors">
                        <FiEye size={18} />
                    </button>
                    <button className="p-2 rounded-full text-gray-400 hover:text-purple-400 hover:bg-gray-700 transition-colors">
                        <FiEdit size={18} />
                    </button>
                    <button 
                        className="p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors"
                        onClick={() => deleteUser(user.id)}
                    >
                        <FiTrash2 size={18} />
                    </button>
                    </div>
                </div>
                ))
            ) : (
                <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
                Aucun utilisateur trouvé
                </div>
            )}
            </div>
      
        </section>
        </AdminLayout>
        </>
    );
}

   
