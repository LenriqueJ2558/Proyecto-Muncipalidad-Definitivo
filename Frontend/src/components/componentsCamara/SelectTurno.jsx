const SelectTurno = ({ register, errors }) => (
    <div className="mb-6 relative">
      <label className="block text-black text-lg font-medium mb-2">Turno:</label>
      <select
        {...register('Turno', { required: 'Este campo es obligatorio' })}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
      >
        <option value="">Seleccione un Turno</option>
        <option value="DÍA">DÍA</option>
        <option value="TARDE">TARDE</option>
        <option value="NOCHE">NOCHE</option>
      </select>
      {errors.Turno && (
        <p className="text-red-500 text-sm mt-2">{errors.Turno.message}</p>
      )}
    </div>
  );
  
  export default SelectTurno;