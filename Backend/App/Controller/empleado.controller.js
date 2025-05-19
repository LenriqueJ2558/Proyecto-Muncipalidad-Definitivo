const Empleado = require ('../Models/empleado.model')
const path = require('path');

const getEmpleado = async (req, res) => {
    try {
        const getAllEmpleado = await Empleado.findAll();
        res.status(200).json(getAllEmpleado);
    } catch (error) {
        console.error('Error retrieving employees:', error);
        return res.status(500).json({ msg: 'Error retrieving employees' });
    }
};

const getEmpleadoByDNI = async (req, res) => {
    const { dni } = req.params;

    try {
        const empleado = await Empleado.findOne({ where: { Dni: dni } });
        if (empleado) {
            res.status(200).json(empleado);
        } else {
            res.status(404).json({ msg: 'Empleado no encontrado' });
        }
    } catch (error) {
        console.error('Error retrieving employee:', error);
        res.status(500).json({ msg: 'Error retrieving employee' });
    }
};
  

const createEmpleado = async (req, res) => {
    try {
        const {
            Dni, Nombre_Empleado, Apellido_Empleado, Sexo, Telefono_Empleado,
            Fecha_Nacimiento, Direccion, Correo_Electronico, Edad, Lugar_de_Nacimiento,
            Tipo_Sangre, Estado_Civil
        } = req.body;

         // Verificar si el Dni ya existe en la base de datos
         const existingEmpleado = await Empleado.findOne({ where: { Dni } });
         if (existingEmpleado) {
             return res.status(400).json({ msg: "El DNI ya está registrado para otro empleado." });
         }

        let Foto = null;
        if (req.files && req.files.image && req.files.image[0]) {
            Foto = `/imagenesEmpleados/${req.files.image[0].filename}`; // Guarda la ruta relativa
        }

        const createdEmpleado = await Empleado.create({
            Dni, Nombre_Empleado, Apellido_Empleado, Sexo, Telefono_Empleado,
            Fecha_Nacimiento, Direccion, Correo_Electronico, Edad, Lugar_de_Nacimiento,
            Tipo_Sangre, Estado_Civil, Foto
        });

        return res.status(200).send(createdEmpleado);
    } catch (error) {
        return res.status(404).json({ msg: error });
    }
};

const updateEmpleado = async (req, res) => {
    try {
        const Dni = req.params.Dni;

        if (!Dni) {
            return res.status(400).json({ error: 'El parámetro Dni no está definido' });
        }

        const {
            Nombre_Empleado, Apellido_Empleado, Sexo, Telefono_Empleado,
            Fecha_Nacimiento, Direccion, Correo_Electronico, Edad, Lugar_de_Nacimiento,
            Tipo_Sangre, Estado_Civil
        } = req.body;

        const existingEmpleado = await Empleado.findOne({ where: { Dni } });

        if (!existingEmpleado) {
            return res.status(404).json({ error: 'El empleado a actualizar no existe' });
        }

        let Foto = existingEmpleado.Foto;
        if (req.files && req.files.image && req.files.image[0]) {
            Foto = `/imagenesEmpleados/${req.files.image[0].filename}`; // Actualiza la ruta de la imagen
        }

        await existingEmpleado.update({
            Nombre_Empleado, Apellido_Empleado, Sexo, Telefono_Empleado,
            Fecha_Nacimiento, Direccion, Correo_Electronico, Edad, Lugar_de_Nacimiento,
            Tipo_Sangre, Estado_Civil, Foto
        });

        const updatedEmpleado = await Empleado.findOne({ where: { Dni } });
        return res.status(200).json(updatedEmpleado);
    } catch (error) {
        console.error('Error al actualizar empleado:', error);
        return res.status(500).json({ error: error.message });
    }
};

  
const deleteEmpleado = async (req, res) => {
    try {
        const Dni = req.params.Dni;

        if (!Dni) {
            return res.status(400).json({ error: 'El parámetro Dni no está definido' });
        }

        const findEmpleado = await Empleado.findOne({ where: { Dni } });

        if (!findEmpleado) {
            return res.status(404).json({ error: 'El empleado a eliminar no existe' });
        }

        await Empleado.destroy({ where: { Dni } });

        return res.status(200).json({ message: `El empleado con el Dni: ${Dni} ha sido eliminado` });
    } catch (error) {
        console.error('Error al eliminar empleado:', error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getEmpleado, createEmpleado, updateEmpleado, deleteEmpleado , getEmpleadoByDNI}