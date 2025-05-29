import React from 'react';
import imgbuo from '../image/buol.png'

const SerenoNoPermission = () => {
  return (
    <div className="serenocontentPermission">
      <div className="flex flex-col items-center justify-center bg-gray-100" id='sereno-content-center'>
        <img className='elbuo' src={imgbuo || "/placeholder.svg"} alt="buo" />
        <p className='title-buo'>¡NO PUEDES VISUALIZAR ESTE CONTENIDO!</p>
        <p className='advertencia'>No tienes los permisos necesarios para acceder a esta sección. Si crees que se trata de un error, por favor contacta al administrador del sistema.</p>
        <br />
        <a
          href="/"
          className="button-buo"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default SerenoNoPermission;
