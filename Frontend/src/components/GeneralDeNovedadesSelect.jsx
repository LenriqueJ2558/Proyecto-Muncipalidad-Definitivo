import React from 'react';

const GeneralDeNovedadesSelect = ({ register, errors }) => {
    return (
        <div className="mb-6">
          <label className="block text-black  text-lg font-medium mb-2">General de Novedades:</label>
          <select
            {...register('GeneralDeNovedades', { required: 'Este campo es obligatorio' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
          >
            <option value="">Seleccione General de Novedad</option>
            <option value="EMISION DE ALERTAS TEMPRANAS EN APOYO A LA PNP, EN ACTIVIDADES PRESUNTAMENTE DELICTIVAS">
              EMISION DE ALERTAS TEMPRANAS EN APOYO A LA PNP, EN ACTIVIDADES PRESUNTAMENTE DELICTIVAS
            </option>
            <option value="EMISION DE ALERTAS TEMPRANAS EN APOYO A LA PNP EN PRESUNTAS FALTAS">
              EMISION DE ALERTAS TEMPRANAS EN APOYO A LA PNP EN PRESUNTAS FALTAS
            </option>
            <option value="EMISION DE ALERTAS TEMPRANAS EN APOYO A LA PNP Y OTRAS GERENCIAS, EN PRESUNTAS INFRACCIONES">
              EMISION DE ALERTAS TEMPRANAS EN APOYO A LA PNP Y OTRAS GERENCIAS, EN PRESUNTAS INFRACCIONES
            </option>
            <option value="AYUDA Y APOYO A PERSONAS Y ENTIDADES">AYUDA Y APOYO A PERSONAS Y ENTIDADES</option>
            <option value="EMISION DE ALERTAS TEMPRANAS EN DESASTRES, INFRAESTRUCTURA, SERVICIOS Y ESPACIOS PUBLICOS AFECTADOS Y EN RIESGO">
              EMISION DE ALERTAS TEMPRANAS EN DESASTRES, INFRAESTRUCTURA, SERVICIOS Y ESPACIOS PUBLICOS AFECTADOS Y EN RIESGO
            </option>
            <option value="ACONTECIMIENTOS ESPECIALES">ACONTECIMIENTOS ESPECIALES</option>
            <option value="OPERATIVOS">OPERATIVOS</option>
          </select>
          {errors.GeneralDeNovedades && (
            <p className="text-red-500 text-sm mt-2">{errors.GeneralDeNovedades.message}</p>
          )}
        </div>
      );
};

export default GeneralDeNovedadesSelect;