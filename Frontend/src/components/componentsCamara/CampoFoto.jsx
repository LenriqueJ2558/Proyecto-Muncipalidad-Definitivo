import React from 'react';

const CampoFoto = ({ handleFileChange, previewFoto, errors }) => {
  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="mb-6">
        <label className="block text-black text-lg font-medium mb-2">Foto:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
        />
        <div className="w-90 h-90 border border-gray-400 rounded-lg overflow-hidden flex items-center justify-center mt-4">
          {previewFoto ? (
            <img
              src={URL.createObjectURL(previewFoto)}
              alt="Vista previa"
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-400">Sin imagen</span>
          )}
        </div>
        {errors?.Foto && (
          <p className="text-red-500 mt-2">{errors.Foto.message}</p>
        )}
      </div>
    </div>
  );
};

export default CampoFoto;