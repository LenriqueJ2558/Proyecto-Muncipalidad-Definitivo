const InfoEstudio = require('../Models/InfoEstudio.model');
const Empleado = require('../Models/empleado.model');

// Crear nueva información de estudio
const crearInfoEstudio = async (req, res) => {
  try {
    // Validar datos de entrada
    const { empleado_Dni, Nivel_Estudio, Profe_oficio, Estudiando_en, Carrera_Empleado, Ciclo_Empleado, Ubi_Sede, Deporte, Licen_A, N_Licen_A, Fech_Revali_A, Licen_B, N_Licen_B, Fech_Revali_B } = req.body;
    if (!empleado_Dni || !Nivel_Estudio || !Profe_oficio || !Estudiando_en || !Carrera_Empleado || 
        !Ciclo_Empleado || !Ubi_Sede || !Deporte 
    ) { // Ajusta los campos requeridos según tus necesidades
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const nuevaInfoEstudio = await InfoEstudio.create(req.body);
    res.status(200).json({ infoEstudio: nuevaInfoEstudio });
  } catch (error) {
    console.error(error); // Cambiado a console.error para mejorar la visibilidad de errores
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las informaciónes de estudio
const obtenerInfoEstudios = async (req, res) => {
  try {
    const infoEstudios = await InfoEstudio.findAll();
    res.status(200).json({ infoEstudios });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener información de estudio por DNI del empleado
const obtenerInfoEstudiosPorEmpleadoDni = async (req, res) => {
  const { dni } = req.params; // Cambia 'id' por 'dni' según el parámetro esperado
  try {
    const infoEstudios = await InfoEstudio.findAll({
      where: {
        empleado_Dni: dni
      },
      include: Empleado
    });
    if (infoEstudios.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron información de este empleado' });
    }
    res.status(200).json({ infoEstudios });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar información de estudio por DNI del empleado
const actualizarInfoEstudioPorEmpleadoDni = async (req, res) => {
  const { dni } = req.params; // Cambia 'id' por 'dni' según el parámetro esperado
  try {
    // Buscar la primera información de estudio que coincida con el Empleado_Dni
    let infoEstudio = await InfoEstudio.findOne({
      where: {
        empleado_Dni: dni
      }
    });

    // Si no se encontró ninguna información de estudio, devolver un error 404
    if (!infoEstudio) {
      return res.status(404).json({ mensaje: 'Información de estudio no encontrada para este empleado' });
    }

    // Actualizar la información de estudio encontrada con los datos enviados en el cuerpo de la solicitud
    infoEstudio = await infoEstudio.update(req.body);

    // Responder con la información de estudio actualizada
    res.status(200).json({ infoEstudio });
  } catch (error) {
    // Manejar errores y responder con un mensaje de error
    res.status(400).json({ error: error.message });
  }
};

// Eliminar información de estudio por DNI del empleado
const eliminarInfoEstudioPorEmpleadoDni = async (req, res) => {
  const { dni } = req.params; // Cambia 'id' por 'dni' según el parámetro esperado
  try {
    // Buscar la primera información de estudio que coincida con el Empleado_Dni
    const infoEstudio = await InfoEstudio.findOne({
      where: {
        empleado_Dni: dni
      }
    });

    // Si no se encontró ninguna información de estudio, devolver un error 404
    if (!infoEstudio) {
      return res.status(404).json({ mensaje: 'Información de estudio no encontrada para este empleado' });
    }

    // Eliminar la información de estudio encontrada
    await infoEstudio.destroy();

    // Responder con un código de estado 204 (No Content) indicando éxito
    res.status(204).json(); // No content
  } catch (error) {
    // Manejar errores y responder con un mensaje de error
    res.status(400).json({ error: error.message });
  }
};

module.exports = { crearInfoEstudio, obtenerInfoEstudios, obtenerInfoEstudiosPorEmpleadoDni, actualizarInfoEstudioPorEmpleadoDni, eliminarInfoEstudioPorEmpleadoDni };