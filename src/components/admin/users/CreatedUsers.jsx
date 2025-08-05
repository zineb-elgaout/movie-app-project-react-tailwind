import React, { useEffect, useState } from 'react';
import {getCreatedUsers} from '../../../../services/userService'; 

function UsersCreatedByAdmin() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getCreatedUsers();
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-white text-xl font-bold mb-4">Users créés par vous</h2>
      {users.length === 0 ? (
        <p className="text-gray-300">Aucun utilisateur créé par vous.</p>
      ) : (
        <ul className="space-y-2">
          {users.map(user => (
            <li key={user.id} className="text-white p-2 bg-gray-700 rounded">
              {user.firstName} {user.lastName} - {user.email} - {user.nationality}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UsersCreatedByAdmin;