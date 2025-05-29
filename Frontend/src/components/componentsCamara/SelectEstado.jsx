const SelectEstado = ({ register, errors }) => (
    <div className="mb-6 relative">
      <label className="block text-black text-lg font-medium mb-2">Estado:</label>
      <select
        {...register('Estado', { required: 'Este campo es obligatorio' })}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
      >
        <option value="">Seleccione un Estado</option>
        <option value="ATENTIDO">ATENTIDO</option>
        <option value="PENDIENTE">PENDIENTE</option>
        <option value="EN PROCESO">EN PROCESO</option>
        <option value="FALSA ALARMA">FALSA ALARMA</option>
      </select>
      {errors.Estado && (
        <p className="text-red-500 text-sm mt-2">{errors.Estado.message}</p>
      )}
    </div>
  );
  
  export default SelectEstado;