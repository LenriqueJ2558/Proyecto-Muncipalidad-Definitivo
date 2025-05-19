import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [passwords, setPasswords] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://192.168.16.246:3003/api/auth/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  const handlePasswordChange = async (userId) => {
    try {
      const newPassword = passwords[userId];
      const token = localStorage.getItem('token');
      const response = await fetch(`http://192.168.16.246:3003/api/auth/user/${userId}/cambiar-contrasena`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword })
      });

      if (response.ok) {
        alert(`Contraseña del usuario ${userId} actualizada con éxito`);
      } else {
        alert('Error al cambiar la contraseña');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-semibold mb-6 text-black">Lista de Usuarios</h2>
      <div className="grid grid-cols-1 gap-6">
        {users.map(user => (
          <div key={user.idUsuario} className="border p-4 rounded-md bg-gray-100 flex justify-between items-center">
            <div>
              <p className="text-lg font-bold text-black">{user.Nombre || 'Nombre no disponible'}</p>
              <p className="text-sm font-bold text-gray-900">{user.Correo || 'Correo no disponible'}</p>
              <p className="text-sm text-gray-700">{user.tipoUsuario?.nombre || 'Tipo de usuario no disponible'}</p>
            </div>
            <div>
              <input
                type="password"
                placeholder="Nueva Contraseña"
                value={passwords[user.idUsuario] || ''}
                onChange={(e) => setPasswords({ ...passwords, [user.idUsuario]: e.target.value })}
                className="form-input w-40 p-2 border border-gray-300 rounded-md bg-gray-200 text-black"
              />
              <button
                onClick={() => handlePasswordChange(user.idUsuario)}
                className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cambiar Contraseña
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;