import React from 'react';
import '../css/notPermission.css';

const NoPermission = () => {
  return (
    <div className="contentPermission">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6" id='content-center'>
        <img
          src="https://edteam-media.s3.amazonaws.com/blogs/big/2ab53939-9b50-47dd-b56e-38d4ba3cc0f0.png"
          alt="404 Error"
          className="w-full max-w-md h-auto mb-6 rounded-lg shadow-lg"
        />
        <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2pzaXRqYzMxN2tyZTAxb294Z293dGVua2NncjM2dWF6cDM3dWh1NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/daDPy7kxfE1TfxLzNg/giphy.gif" alt="" id='alert'/>
        <br />
        <h2 className="text-5xl font-extrabold text-gray-800 mb-4">
          ¡Acceso Denegado!
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8 max-w-md">
          Lo sentimos, pero no tienes los permisos necesarios para acceder a esta página.
          Si crees que esto es un error, por favor contacta con el administrador.
        </p>
        <a
          href="/"
          className="px-8 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default NoPermission;