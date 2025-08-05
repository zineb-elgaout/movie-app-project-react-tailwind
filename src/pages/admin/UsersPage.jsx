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
import { deleteUser } from "../../../services/userService";
import AddUser from "../../components/admin/users/AddUser";
import UpdateUser from "../../components/admin/users/UpdateUser";
import { getUserProfile } from "../../../services/userService";
import UsersCreatedByAdmin from "../../components/admin/users/CreatedUsers";

export default function UsersPage() {


const userProfile = getUserProfile();

if (userProfile) {
  console.log("Utilisateur connecté :", userProfile.firstName, userProfile.email);
  
  console.log("Récupération du profil utilisateur :", userProfile); 
  // Affiche dans l’UI, adapte selon besoins
} else {
  console.log("Utilisateur non connecté");
}

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { users , loading, error, fetchUsers } = useUsers();
    const {
            searchTerm,
            setSearchTerm,
            filteredData: filteredUsers
    } = useSearch(users, ['firstName', 'lastName', 'email', 'role']);

    
    const handleDeleteUser = async (id) => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
        if (!confirmed) return;

        try {
            await deleteUser(id); 
            fetchUsers();
        } catch (err) {
            console.error("Erreur lors de la suppression de l'utilisateur :", err);
            alert("Une erreur est survenue lors de la suppression.");
        }
    };


    if (loading) { return (<Loading />)};
    if(error) return (<ErrorMessage message={error} />) ; 

     return(
        <>
        <AdminLayout>


        <section className="px-4 sm:px-6 py-8 bg-gray-900 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <UsersCreatedByAdmin />
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
                <Button onClick={() => setShowAddModal(true)}>
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
                        
                                <div className="font-medium">{user.firstName} {user.lastName}</div>
                        
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
                                onClick={() => {
                                    setSelectedUser(user);
                                    setShowUpdateModal(true);
                                }}
                            >
                                <FiEdit size={18} />
                            </button>
                            <button 
                            
                                className="p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors"
                                title="Supprimer"
                                onClick={() => handleDeleteUser(user.id) }
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

            
      
        </section>
        {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <AddUser
            onClose={() => setShowAddModal(false)}
            onUserAdded={fetchUsers}
            />
        </div>
        )}
        {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <UpdateUser
            onClose={() => setShowUpdateModal(false)}
            onUserUpdated={fetchUsers}
            user={selectedUser}
            />
        </div>
        )}


        </AdminLayout>
        </>
    );
}

   
