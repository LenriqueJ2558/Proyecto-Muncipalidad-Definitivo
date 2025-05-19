const InfoEmpleado = require('../Models/Info_Empleado.model');
const Empleado = require('../Models/empleado.model');

// Crear nueva información de empleado
const crearInfoEmpleado = async (req, res) => {
  try {
    // Validar datos de entrada
    const { empleado_Dni, Ape_Nom_Papa, Ape_Nom_Mama, Ape_Nom_Conyu, Fecha_Naci_Coyu, Nomb_Hijo1, Nomb_Hijo2, Nomb_Hijo3, Nomb_Hijo4 } = req.body;
    if (!empleado_Dni || !Ape_Nom_Papa || !Ape_Nom_Mama ) {
      return res.status(400).json({ error: 'Falta el DNI del empleado' });
    }

    const nuevaInfoEmpleado = await InfoEmpleado.create(req.body);
    res.status(200).json({ infoEmpleado: nuevaInfoEmpleado });
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: error.message });
  }
};

// Obtener toda la información de empleados
const obtenerInfoEmpleados = async (req, res) => {
  try {
    const infoEmpleados = await InfoEmpleado.findAll();
    res.status(200).json({ infoEmpleados });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener información de empleado por DNI del empleado
const obtenerInfoEmpleadoPorDni = async (req, res) => {
  const { dni } = req.params; // Cambia 'id' por 'dni' según el parámetro esperado
  try {
    const infoEmpleado = await InfoEmpleado.findOne({
      where: {
        empleado_Dni: dni
      },
      include: Empleado
    });
    if (!infoEmpleado) {
      return res.status(404).json({ mensaje: 'No se encontró información de este empleado' });
    }
    res.status(200).json({ infoEmpleado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar información de empleado por DNI del empleado
const actualizarInfoEmpleadoPorDni = async (req, res) => {
  const { dni } = req.params; // Cambia 'id' por 'dni' según el parámetro esperado
  try {
    // Buscar la información de empleado que coincida con el empleado_Dni
    let infoEmpleado = await InfoEmpleado.findOne({
      where: {
        empleado_Dni: dni
      }
    });

    // Si no se encontró ninguna información de empleado, devolver un error 404
    if (!infoEmpleado) {
      return res.status(404).json({ mensaje: 'Información de empleado no encontrada para este DNI' });
    }

    // Actualizar la información de empleado encontrada con los datos enviados en el cuerpo de la solicitud
    infoEmpleado = await infoEmpleado.update(req.body);

    // Responder con la información de empleado actualizada
    res.status(200).json({ infoEmpleado });
  } catch (error) {
    // Manejar errores y responder con un mensaje de error
    res.status(400).json({ error: error.message });
  }
};

// Eliminar información de empleado por DNI del empleado
const eliminarInfoEmpleadoPorDni = async (req, res) => {
  const { dni } = req.params; // Cambia 'id' por 'dni' según el parámetro esperado
  try {
    // Buscar la información de empleado que coincida con el empleado_Dni
    const infoEmpleado = await InfoEmpleado.findOne({
      where: {
        empleado_Dni: dni
      }
    });

    // Si no se encontró ninguna información de empleado, devolver un error 404
    if (!infoEmpleado) {
      return res.status(404).json({ mensaje: 'Información de empleado no encontrada para este DNI' });
    }

    // Eliminar la información de empleado encontrada
    await infoEmpleado.destroy();

    // Responder con un código de estado 204 (No Content) indicando éxito
    res.status(204).json(); // No content
  } catch (error) {
    // Manejar errores y responder con un mensaje de error
    res.status(400).json({ error: error.message });
  }
};

module.exports = { crearInfoEmpleado, obtenerInfoEmpleados, obtenerInfoEmpleadoPorDni, actualizarInfoEmpleadoPorDni, eliminarInfoEmpleadoPorDni };