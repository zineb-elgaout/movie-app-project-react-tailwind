import { useState, useEffect } from "react";
import { getAllUsers } from "../../services/userService";

export default function useUsers(autoFetch = true) {
    const [users , setUsers] = useState ([]);
    const [loading , setLoading] =useState ([]);
    const [error , setError] = useState (null);
    const fetchUsers = async () =>{
        try {
            setLoading(true);
            const res =await getAllUsers();
            setUsers(res.data);
        }catch (err){
            setError ("Erreur lors du chargement des Utilisateurs");
        }finally {
            setLoading(false);
        }
    };
    useEffect(()=>{
        if (autoFetch) fetchUsers();
    },[]);
    
    
    return {users , loading, error , fetchUsers};
}

