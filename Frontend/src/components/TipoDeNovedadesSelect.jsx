import React from 'react';

const TipoDeNovedadesSelect = ({ register, errors }) => {
  return (
    <div className="mb-6">
      <label className="block text-black text-lg font-medium mb-2">Tipo de Novedad:</label>
      <select
        {...register('TipoDeNovedades', { required: 'Este campo es obligatorio' })}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-black"
      >
        <option value="">Seleccione el Tipo de Novedad</option>
        <option value="PRESUNTAS ACTIVIDADES CONTRA LA VIDA EL CUERPO Y LA SALUD">PRESUNTAS ACTIVIDADES CONTRA LA VIDA EL CUERPO Y LA SALUD</option>
        <option value="PRESUNTA ACTIVIDAD CONTRA LA LIBERTAD">PRESUNTA ACTIVIDAD CONTRA LA LIBERTAD</option>
        <option value="PRESUNTAS ACTIVIDADES CONTRA EL PATRIMONIO">PRESUNTAS ACTIVIDADES CONTRA EL PATRIMONIO</option>
        <option value="PRESUNTAS ACTIVADADES CONTRA LA SEG. PUB.">PRESUNTAS ACTIVADADES CONTRA LA SEG. PUB.</option>
        <option value="PRE.ACTIV.CONTRA LA SALUD PUB.">PRE.ACTIV.CONTRA LA SALUD PUB.</option>
        <option value="PRE.ACTIV. AMBIENTALES">PRE.ACTIV. AMBIENTALES</option>
        <option value="PRESUNTA ACTIVADAD CONTRA LA TRANQUILIDAD PUB">PRESUNTA ACTIVADAD CONTRA LA TRANQUILIDAD PUB</option>
        <option value="PRESUNTA ACTIV. CONTRA LA ADM. PUB.">PRESUNTA ACTIV. CONTRA LA ADM. PUB.</option>
        <option value="PRE.ACTIV.CONTRA LOS PODERES DEL ESTADO">PRE.ACTIV.CONTRA LOS PODERES DEL ESTADO</option>
        <option value="PRESUNTA ACTIV , CONTRA LA PERSONA">PRESUNTA ACTIV , CONTRA LA PERSONA</option>
        <option value="PRESUNTA ACTIV, CONTRA EL PATRIMONIO">PRESUNTA ACTIV, CONTRA EL PATRIMONIO</option>
        <option value="PRE.ACTIV.CONTRA LA SEG.PUBLICA">PRE.ACTIV.CONTRA LA SEG.PUBLICA</option>
        <option value="PRESUNTA ACTIV, CONTRA LAS BUENAS COSTUMBRES">PRESUNTA ACTIV, CONTRA LAS BUENAS COSTUMBRES</option>
        <option value="PRESUNTA ACTIV, CONTRA LA TRANQUIL.PUB.">PRESUNTA ACTIV, CONTRA LA TRANQUIL.PUB.</option>
        <option value="PRESUNTOS ACCIDENTES E INFRACCIONES AL TRANSITO Y TRANSPORTE">PRESUNTOS ACCIDENTES E INFRACCIONES AL TRANSITO Y TRANSPORTE</option>
        <option value="PRESUNTA ACTIV, CONTRA LA LEY DE PROTEC Y BIENESTAR ANIMAL">PRESUNTA ACTIV, CONTRA LA LEY DE PROTEC Y BIENESTAR ANIMAL</option>
        <option value="PRESUNTA ACTIV , DE PERSONAS QUE AFECTAN TRANQUILIDAD Y EL ORDEN">PRESUNTA ACTIV , DE PERSONAS QUE AFECTAN TRANQUILIDAD Y EL ORDEN</option>
        <option value="PRESUNTAS INFRACCIONES A LAS ORDENANZAS Y LICENCIAS MUNICIPALES">PRESUNTAS INFRACCIONES A LAS ORDENANZAS Y LICENCIAS MUNICIPALES</option>
        <option value="AYUDA, AUXILIO Y RESCATE DE PERSONAS">AYUDA, AUXILIO Y RESCATE DE PERSONAS</option>
        <option value="APOYO A OTRAS GERENCIAS O AREAS DE LA MUNICIPALIDAD">APOYO A OTRAS GERENCIAS O AREAS DE LA MUNICIPALIDAD</option>
        <option value="APOYO A OTRAS ENTIDADES">APOYO A OTRAS ENTIDADES</option>
        <option value="DESASTRES">DESASTRES</option>
        <option value="INFRAESTRUCTURA Y SERVICIOS ESENCIALES">INFRAESTRUCTURA Y SERVICIOS ESENCIALES</option>
        <option value="ESPACIOS PUBLICOS EN RIESGO">ESPACIOS PUBLICOS EN RIESGO</option>
        <option value="PRESUNTOS ACONTECIMIENTOS ESPECIALES">PRESUNTOS ACONTECIMIENTOS ESPECIALES</option>
        <option value="DESAOPERATIVO MUNICIPALSTRES">DESAOPERATIVO MUNICIPALSTRES</option>
        <option value="ESTRATEGIAS Y OPERATIVOS ESPECIALES">ESTRATEGIAS Y OPERATIVOS ESPECIALES</option>
      </select>
      {errors.TipoDeNovedades && (
        <p className="text-red-500 text-sm mt-2">{errors.TipoDeNovedades.message}</p>
      )}
    </div>
  );
};

export default TipoDeNovedadesSelect;