import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UsersCreatedByAdmin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7274/api/User/created-users')
      .then(res => setUsers(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2 className='text-white'>Users créés par vous</h2>
      <ul className='text-white'>
        {users.map(user => (
          <li key={user.id}>{user.firstName} {user.lastName} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsersCreatedByAdmin;
