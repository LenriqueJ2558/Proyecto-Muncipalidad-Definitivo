import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const BuscarPorCodigo = ({ label, placeholder, onClick, register, name }) => {
  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <label className="block text-gray-700 font-semibold mb-0.5">
          {label}
        </label>
        <input
          type="text"
          {...register(name)}
          className="codigo-btn"
          placeholder={placeholder}
        />
        <button
          onClick={onClick}
          className="search-btn"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className='search-novedad' /> Buscar
        </button>
      </div>
    </div>
  );
};

export default BuscarPorCodigo;