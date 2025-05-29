const TipoDeNovedadesInput = ({ register, errors }) => (
  <div className="mb-6">
    <label className="block text-black text-lg font-medium mb-2">Tipo de Novedades:</label>
    <input
      type="text"
      {...register('TipoDeNovedades', { required: 'Este campo es obligatorio' })}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
      placeholder="Tipo de Novedades"
      readOnly
    />
    {errors.TipoDeNovedades && (
      <p className="text-red-500 text-sm mt-2">{errors.TipoDeNovedades.message}</p>
    )}
  </div>
);

export default TipoDeNovedadesInput;