import { useState } from "react";

const AutoResizeTextarea = ({ register, errors }) => {
  const [description, setDescription] = useState("");

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // Resetea la altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta la altura basada en el contenido
    setDescription(textarea.value); // Actualiza el estado
  };

  return (
    <div className="mb-6">
      <label className="block text-black text-lg font-medium mb-2">Descripcion de la Novedad:</label>
      <textarea
        {...register('DescripciondeNovedad', { required: 'Este campo es obligatorio' })}
        className="w-full px-2 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none overflow-hidden"
        placeholder="Ingrese la descripción de la novedad"
        value={description}
        onChange={handleInput}
        rows="1"
      ></textarea>
    </div>
  );
};

export default AutoResizeTextarea;