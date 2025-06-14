import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import '../css/detallerUser.css';
import Swal from 'sweetalert2';

const UserDetails = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    correo: ''
  });

  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://192.168.16.246:3003/api/auth/user-details', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handlePasswordChange = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://192.168.16.246:3003/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword })
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Contraseña actualizada con éxito',
          confirmButtonColor: '#3085d6',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cambiar la contraseña',
          confirmButtonColor: '#d33',
        });
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="p-6 rounded-lg shadow-md max-w-2xl mx-auto" id="backUser">
        <h2 className="text-center text-2xl font-semibold mb-6 text-black">
          <FontAwesomeIcon icon={faUserEdit} id='iconUser' className="mr-2" /> Detalles del Usuario
        </h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="nombre" className="block text-lg font-medium mb-2 text-black">Nombre:</label>
            <p id="nombre" className="border p-3 rounded-md text-black bg-gray-100">{userData.nombre}</p>
          </div>
          <div>
            <label htmlFor="correo" className="block text-lg font-medium mb-2 text-black">Correo:</label>
            <p id="correo" className="border p-3 rounded-md text-black bg-gray-100">{userData.correo}</p>
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-lg font-medium mb-2 text-black">Nueva Contraseña:</label>
            <input
              id="newPassword"
              type="password"
              placeholder="Ingrese nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-input w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-black"
            />
          </div>
          <div className="text-center mt-4">
            <button
              onClick={handlePasswordChange}
              className=" text-white px-6 py-3 rounded-md" id='buttonDetalles'
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;