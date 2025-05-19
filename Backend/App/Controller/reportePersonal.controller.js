const Empleado = require('../Models/empleado.model');
const Actividad = require('../Models/Actividad.model');

const obtenerReportePersonal = async (req, res) => {
  try {
    const reportes = await Actividad.findAll({
      include: [{
        model: Empleado,
        attributes: ['Nombre_Empleado', 'Apellido_Empleado', 'Telefono_Empleado', 'Direccion', 'Edad']
      }]
    });
    res.json(reportes);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};

module.exports = { obtenerReportePersonal };