const { Op, Sequelize } = require('sequelize');
const Empleado = require('../Models/empleado.model');
const Actividad = require('../Models/Actividad.model');

// Controlador para obtener los empleados con cargo "SUPERVISOR DE CÁMARA"
const getSupervisoresCamara = async (req, res) => {
    try {
      const supervisores = await Actividad.findAll({
        where: {
          Cargo_Desempeño: 'SUPERVISOR DE CÁMARA'
        },
        include: [{
          model: Empleado,
          attributes: ['Dni', 'Nombre_Empleado', 'Apellido_Empleado', 'Telefono_Empleado', 'Correo_Electronico']
        }]
      });
  
      // Formatear la respuesta si es necesario
      const resultadoFormateado = supervisores.map(actividad => ({
        Id: actividad.Id,
        Cargo_Desempeño: actividad.Cargo_Desempeño,
        Turno: actividad.Turno,
        Base: actividad.Base,
        Estado: actividad.Estado,
        empleado: {
          Dni: actividad.empleado.Dni,
          NombreCompleto: `${actividad.empleado.Nombre_Empleado} ${actividad.empleado.Apellido_Empleado}`,
          Telefono: actividad.empleado.Telefono_Empleado,
          Correo: actividad.empleado.Correo_Electronico
        }
      }));
  
      res.status(200).json({
        success: true,
        data: resultadoFormateado
      });
    } catch (error) {
      console.error('Error realizando la consulta:', error);
      res.status(500).json({
        success: false,
        message: 'Hubo un error al realizar la consulta',
        error: error.message
      });
    }
  };
  const getOperadoresCamara = async (req, res) => {
    try {
      // Realizar la consulta para obtener los operadores de cámara
      const operadores = await Actividad.findAll({
        where: {
          Cargo_Desempeño: 'OPERADOR DE CÁMARA' // Cambiado de 'SUPERVISOR DE CÁMARA' a 'OPERADOR DE CÁMARA'
        },
        include: [{
          model: Empleado,
          attributes: ['Dni', 'Nombre_Empleado', 'Apellido_Empleado', 'Telefono_Empleado', 'Correo_Electronico']
        }]
      });
  
      // Formatear la respuesta
      const resultadoFormateado = operadores.map(actividad => ({
        Id: actividad.Id,
        Cargo_Desempeño: actividad.Cargo_Desempeño,
        Turno: actividad.Turno,
        Base: actividad.Base,
        Estado: actividad.Estado,
        empleado: {
          Dni: actividad.empleado.Dni,
          NombreCompleto: `${actividad.empleado.Nombre_Empleado} ${actividad.empleado.Apellido_Empleado}`,
          Telefono: actividad.empleado.Telefono_Empleado,
          Correo: actividad.empleado.Correo_Electronico
        }
      }));
  
      // Enviar respuesta con los datos formateados
      res.status(200).json({
        success: true,
        data: resultadoFormateado
      });
    } catch (error) {
      console.error('Error realizando la consulta:', error);
      res.status(500).json({
        success: false,
        message: 'Hubo un error al realizar la consulta',
        error: error.message
      });
    }
  };
module.exports = {
  getSupervisoresCamara , getOperadoresCamara
  
};