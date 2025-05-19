import React from 'react';

const NoPermission = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <img
        src="https://edteam-media.s3.amazonaws.com/blogs/big/2ab53939-9b50-47dd-b56e-38d4ba3cc0f0.png"
        alt="404 Error"
        className="w-full max-w-md h-auto mb-6 rounded-lg shadow-lg"
      />
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
  );
};

export default NoPermission;