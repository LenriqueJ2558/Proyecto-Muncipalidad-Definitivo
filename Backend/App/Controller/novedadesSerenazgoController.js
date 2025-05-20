const NovedadesSerenazgo = require('../Models/NovedadesSerenazgo.model');
const Usuario = require('../Models/usuario.model'); // Asegúrate de ajustar la ruta al modelo

exports.createNovedad = async (req, res) => {
  try {
    const { nombre_cliente, descripcion, latitud, longitud } = req.body;
    const foto = req.files?.foto?.[0]?.filename || null;
    const video = req.files?.video?.[0]?.filename || null;

    const usuarioId = req.userId;  // <-- Usuario que crea la novedad

    const novedad = await NovedadesSerenazgo.create({
      nombre_cliente,
      descripcion,
      latitud,
      longitud,
      foto,
      video,
      usuarioId  // Guardamos el id del usuario
    });

    res.status(201).json(novedad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la novedad' });
  }
};
exports.getNovedadesMobile = async (req, res) => {
  try {
    const userId = req.userId;

    // Buscar el usuario y su tipo/rol
    const usuario = await Usuario.findByPk(userId, { include: 'tipoUsuario' });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    let novedades;

    if (usuario.tipoUsuario.nombre === 'Administrador') {
      // Admin ve todo
      novedades = await NovedadesSerenazgo.findAll({
        order: [['created_at', 'DESC']],
      });
    } else {
      // Usuario normal ve solo sus novedades
      novedades = await NovedadesSerenazgo.findAll({
        where: { usuarioId: userId },
        order: [['created_at', 'DESC']],
      });
    }

    res.json(novedades);
  } catch (error) {
    console.error('Error al obtener novedades:', error);
    res.status(500).json({ error: 'Error al obtener novedades' });
  }
};
  exports.getNovedadById = async (req, res) => {
    const { id } = req.params;
    try {
      const novedad = await NovedadesSerenazgo.findByPk(id);
      if (!novedad) {
        return res.status(404).json({ error: 'Novedad no encontrada' });
      }
      res.json(novedad);
    } catch (error) {
      console.error('Error al obtener la novedad:', error);
      res.status(500).json({ error: 'Error al obtener la novedad' });
    }
  };