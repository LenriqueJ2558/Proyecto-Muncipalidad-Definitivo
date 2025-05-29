const GeneralDeNovedadesInput = ({ register, errors }) => (
  <div className="mb-6">
    <label className="block text-black text-lg font-medium mb-2">General de Novedades:</label>
    <input
      type="text"
      {...register('GeneralDeNovedades', { required: 'Este campo es obligatorio' })}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
      placeholder="General de Novedades"
      readOnly
    />
    {errors.GeneralDeNovedades && (
      <p className="text-red-500 text-sm mt-2">{errors.GeneralDeNovedades.message}</p>
    )}
  </div>
);

export default GeneralDeNovedadesInput;