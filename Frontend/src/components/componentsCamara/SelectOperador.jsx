import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const SelectOperador = ({ register, errors, operadores }) => (
  <div className="mb-6 relative">
    <label className="block text-black text-lg font-medium mb-2">Nombre del Operador:</label>
    <div className="relative">
      <select
        {...register('NombreOperador', { required: 'Este campo es obligatorio' })}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black appearance-none"
      >
        <option value="">Seleccione un Operador</option>
        {operadores.length > 0 ? (
          operadores.map((operador) => (
            <option key={operador.Id} value={operador.empleado.NombreCompleto}>
              {operador.empleado.NombreCompleto || 'Nombre no disponible'}
            </option>
          ))
        ) : (
          <option value="">No hay operadores disponibles</option>
        )}
      </select>
      <FontAwesomeIcon
        icon={faChevronDown}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
    {errors.NombreOperador && (
      <p className="text-red-500 text-sm mt-2">{errors.NombreOperador.message}</p>
    )}
  </div>
);

export default SelectOperador;