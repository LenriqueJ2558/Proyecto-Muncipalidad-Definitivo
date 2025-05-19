const TipoDeIncidencias = require('../Models/TipodeIncidencias.model'); // Asegúrate de la ruta correcta al modelo

// Función para obtener una incidencia según el código
const obtenerIncidenciaPorCodigo = async (req, res) => {
  const { codigo } = req.params;

  try {
    // Busca la incidencia por su código
    const incidencia = await TipoDeIncidencias.findOne({
      where: { CODIGO: codigo }
    });

    if (!incidencia) {
      return res.status(404).json({ message: 'No se encontraron datos para el código proporcionado' });
    }

    // Devuelve solo los campos deseados
    res.json({
      GENERAL: incidencia.GENERAL,
      TIPO: incidencia.TIPO,
      SUBTIPO: incidencia.SUBTIPO
    });
  } catch (error) {
    console.error('Error al buscar la incidencia:', error);
    res.status(500).json({ message: 'Error al buscar los datos' });
  }
};

module.exports = {
  obtenerIncidenciaPorCodigo
};