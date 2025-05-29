const SelectNumeroEstacion = ({ register, errors }) => (
    <div className="mb-6 relative">
      <label className="block text-black text-lg font-medium mb-2">Número de Estación:</label>
      <select
        {...register('NumeroDeEstacion', { required: 'Este campo es obligatorio' })}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
      >
        <option value="">Seleccione una Estación</option>
        <option value="PC1">PC1</option>
        <option value="PC2">PC2</option>
        <option value="PC3">PC3</option>
        <option value="PC4">PC4</option>
        <option value="PC5">PC5</option>
        <option value="QUIRIO">QUIRIO</option>
      </select>
      {errors.NumeroDeEstacion && (
        <p className="text-red-500 text-sm mt-2">{errors.NumeroDeEstacion.message}</p>
      )}
    </div>
  );
  
  export default SelectNumeroEstacion;