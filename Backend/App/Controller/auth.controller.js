const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const userModel = require("../Models/usuario.model.js");
const TipoUsuario = require("../Models/Tipo_Usuario.model.js");
const Empleado = require("../Models/empleado.model.js");
const moment = require("moment-timezone");


exports.signup  = async (req, res) => {
    const { Usuario, Contraseña, Nombre, Correo, empleado_Dni, tipo_usuario_Id } = req.body;

    try {
        // Validar que Correo esté presente y tenga un valor no vacío
        if (!Correo) {
            return res.status(400).send('Correo no proporcionado');
        }
        if (!empleado_Dni || !tipo_usuario_Id) {
            return res.status(400).send({ message: "Empleado DNI y Tipo de Usuario son requeridos." });
        }
        if (!Usuario || !Correo || !Contraseña || !Nombre) {
            return res.status(400).send({ message: "Todos los campos son requeridos." });
        }
        const empleado = await Empleado.findOne({ where: { Dni: empleado_Dni } });
        if (!empleado) {
            return res.status(400).send({ message: "Empleado no encontrado." });
        }
        const tipoUsuario = await TipoUsuario.findOne({ where: { id: tipo_usuario_Id } });
        if (!tipoUsuario) {
            return res.status(400).send({ message: "Tipo de Usuario no encontrado." });
        }
        const existingUser = await userModel.findOne({ where: { Usuario: Usuario } });
        if (existingUser) {
            return res.status(400).send({ message: "El nombre de usuario ya está en uso." });
        }
        const existingEmail = await userModel.findOne({ where: { Correo: Correo } });
        if (existingEmail) {
            return res.status(400).send({ message: "El correo ya está en uso." });
        }
        
        // Encriptar la contraseña antes de crear el usuario
        const hashedPass = bcrypt.hashSync(Contraseña, 8);

        // Crear el usuario en la base de datos
        const createdUser = await userModel.create({
            Usuario,
            Contraseña: hashedPass,
            Nombre,
            Correo,
            empleado_Dni,
            tipo_usuario_Id
        });
            
        return res.status(200).send(createdUser);
    } catch (error) {
        console.error('Error al registrar al usuario:', error);
        return res.status(500).send('Error al registrar al usuario');
    }
};

exports.signin = async (req, res) => {
    const { Usuario, Correo, Contraseña } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await userModel.findOne({
            where: { Correo },
            include: [{ model: TipoUsuario, as: 'tipoUsuario' }] // Incluir el modelo TipoUsuario
        });
        if (!user) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const passwordIsValid = bcrypt.compareSync(Contraseña, user.Contraseña);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Contraseña inválida' });
        }
         // Actualizar last_session con la hora peruana
         const horaPeruana = moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss');
         user.last_session = horaPeruana;
         await user.save(); // Guardar los cambios en la base de datos
 
  


        // Generar un token JWT
        const token = jwt.sign({ id: user.idUsuario }, config.secret, { expiresIn: 86400 }); // 24 horas

        // Enviar el token y los datos del usuario al cliente
        res.status(200).send({ 
            id: user.idUsuario,
            Usuario: user.Usuario,
            Nombre: user.Nombre,
            Correo: user.Correo,
            TipoRol: user.tipoUsuario ? user.tipoUsuario.nombre : null, // Tipo de rol, ajusta según tu modelo
            accessToken: token
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send({ message: 'Error al iniciar sesión' });
    }
};
 exports.getUsuarioById = async (req, res) => {
    try {
      const token = req.headers['authorization'].split(' ')[1];
      const decoded = jwt.verify(token, config.secret); // Usa tu clave secreta para verificar el token
  
      const usuario = await userModel.findByPk(decoded.id); // Usamos el ID del token para buscar al usuario
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.json({
        nombre: usuario.Nombre,
        correo: usuario.Correo,
        tipoUsuario: usuario.tipo_usuario_Id // Asegúrate de que el tipo de usuario esté en el modelo
      });
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  
  // Cambiar la contraseña del usuario
  exports.changePassword = async (req, res) => {
    try {
      const token = req.headers['authorization'].split(' ')[1];
      const decoded = jwt.verify(token, config.secret);
  
      const { newPassword } = req.body;
      if (!newPassword) {
        return res.status(400).json({ message: 'Nueva contraseña es requerida' });
      }
  
      const usuario = await userModel.findByPk(decoded.id);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Asegúrate de hash la nueva contraseña antes de guardarla
      usuario.Contraseña = bcrypt.hashSync(newPassword, 10);
      await usuario.save();
  
      res.json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
 exports.getUsers = async (req, res) => {
    try {
      const usuarios = await userModel.findAll({
        include: [
          {
            model: TipoUsuario,
            as: 'tipoUsuario',
            attributes: ['nombre'] // Ajusta esto según los atributos que necesitas
          },
          {
            model: Empleado,
            attributes: ['Dni'] // Ajusta esto según los atributos que necesitas
          }
        ]
      });
  
      res.status(200).json(usuarios);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      res.status(500).json({ message: 'Error al obtener la lista de usuarios' });
    }
  };
  exports.cambiarContrasena = async (req, res) => {
    const { userId } = req.params;
    const { newPassword } = req.body;
  
    if (!newPassword) {
      return res.status(400).json({ message: 'Nueva contraseña es requerida' });
    }
  
    try {
      // Encontrar el usuario por su id
      const usuario = await userModel.findByPk(userId);
  
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Hashear la nueva contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      // Actualizar la contraseña del usuario
      usuario.Contraseña = hashedPassword;
      await usuario.save();
  
      return res.status(200).json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  



exports.signout = async (req, res) => {
    try {
        // Limpiar la sesión eliminando el token
        req.session = null;

        // Enviar respuesta exitosa
        return res.status(200).send({ message: "¡Has cerrado sesión exitosamente!" });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};