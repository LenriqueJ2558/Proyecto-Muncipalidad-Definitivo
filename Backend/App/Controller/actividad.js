const Actividad = require('../Models/Actividad.model')
const Empleado = require('../Models/empleado.model')
const crearActividad = async (req, res) => {
  try {
    // Validar datos de entrada
    const { empleado_Dni, Cargo_Contrato, Cargo_Desempeño, Turno, Base, Estado, Modal, Fecha_Entrada } = req.body;
    if (!empleado_Dni || !Cargo_Contrato || !Cargo_Desempeño || !Turno || !Base || !Estado || !Modal || !Fecha_Entrada) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const nuevaActividad = await Actividad.create(req.body);
    res.status(200).json({ actividad: nuevaActividad });
  } catch (error) {
    console.error(error); // Cambiado a console.error para mejorar la visibilidad de errores
    res.status(400).json({ error: error.message });
  }
};

  const obtenerActividades = async (req, res) => {
    try {
      const actividades = await Actividad.findAll();
      res.status(200).json({ actividades });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const obtenerActividadesPorEmpleadoDni = async (req, res) => {
    const { dni } = req.params; // Cambia 'id' por 'dni' según el parámetro esperado
    try {
      const actividades = await Actividad.findAll({
        where: {
          empleado_Dni: dni
        },
        include: Empleado
      });
      if (actividades.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron actividades para este empleado' });
      }
      res.status(200).json({ actividades });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  const actualizarActividadPorEmpleadoDni = async (req, res) => {
    const { dni } = req.params; // Cambia 'id' por 'dni' según el parámetro esperado
    try {
      // Buscar la primera actividad que coincida con el Empleado_Dni
      let actividad = await Actividad.findOne({
        where: {
          empleado_Dni: dni
        }
      });
  
      // Si no se encontró ninguna actividad, devolver un error 404
      if (!actividad) {
        return res.status(404).json({ mensaje: 'Actividad no encontrada para este empleado' });
      }
  
      // Actualizar la actividad encontrada con los datos enviados en el cuerpo de la solicitud
      actividad = await actividad.update(req.body);
  
      // Responder con la actividad actualizada
      res.status(200).json({ actividad });
    } catch (error) {
      // Manejar errores y responder con un mensaje de error
      res.status(400).json({ error: error.message });
    }
  };
  const eliminarActividadPorEmpleadoDni = async (req, res) => {
    const { dni } = req.params; // Cambia 'id' por 'dni' según el parámetro esperado
    try {
      // Buscar la primera actividad que coincida con el Empleado_Dni
      const actividad = await Actividad.findOne({
        where: {
          empleado_Dni: dni
        }
      });
  
      // Si no se encontró ninguna actividad, devolver un error 404
      if (!actividad) {
        return res.status(404).json({ mensaje: 'Actividad no encontrada para este empleado' });
      }
  
      // Eliminar la actividad encontrada
      await actividad.destroy();
  
      // Responder con un código de estado 204 (No Content) indicando éxito
      res.status(204).json(); // No content
    } catch (error) {
      // Manejar errores y responder con un mensaje de error
      res.status(400).json({ error: error.message });
    }
  };

  module.exports = {crearActividad,obtenerActividadesPorEmpleadoDni, obtenerActividades , actualizarActividadPorEmpleadoDni,eliminarActividadPorEmpleadoDni}