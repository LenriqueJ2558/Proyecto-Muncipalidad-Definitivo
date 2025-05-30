import React from 'react';

const CampoLectura = ({ label, value, register, name, placeholder }) => (
  <div className="mb-6">
    <label className="block text-black text-lg font-medium mb-2">{label}</label>
    <input
      type="text"
      value={value}
      {...register(name)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
      placeholder={placeholder}
      disabled
    />
  </div>
);

const CamposGeolocalizacion = ({ locationData, register }) => {
  return (
    <>
      <CampoLectura
        label="Longitud:"
        value={locationData.longitud}
        register={register}
        name="Longitud"
        placeholder="Longitud"
      />
      <CampoLectura
        label="Latitud:"
        value={locationData.latitud}
        register={register}
        name="Lat"
        placeholder="Latitud"
      />
      <CampoLectura
        label="Localización:"
        value={locationData.localizacion}
        register={register}
        name="Localizacion"
        placeholder="Ingrese la ubicación de la novedad"
      />
    </>
  );
};

export default CamposGeolocalizacion;