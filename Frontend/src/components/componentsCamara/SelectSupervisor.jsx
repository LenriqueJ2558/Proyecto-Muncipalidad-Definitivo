import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const SelectSupervisor = ({ register, errors, supervisores }) => (
  <div className="mb-6 relative">
    <label className="block text-black text-lg font-medium mb-2">Nombre del Supervisor:</label>
    <div className="relative">
      <select
        {...register('NombreSupervisor', { required: 'Este campo es obligatorio' })}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black appearance-none"
      >
        <option value="">Seleccione un Supervisor</option>
        {supervisores.length > 0 ? (
          supervisores.map((supervisor) => (
            <option key={supervisor.Id} value={supervisor.empleado.NombreCompleto}>
              {supervisor.empleado.NombreCompleto || 'Nombre no disponible'}
            </option>
          ))
        ) : (
          <option value="">No hay supervisores disponibles</option>
        )}
      </select>
      <FontAwesomeIcon
        icon={faChevronDown}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
    {errors.NombreSupervisor && (
      <p className="text-red-500 text-sm mt-2">{errors.NombreSupervisor.message}</p>
    )}
  </div>
);

export default SelectSupervisor;