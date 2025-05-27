const NovedadesSerenazgo = require('../Models/NovedadesSerenazgo.model');
const Usuario = require('../Models/usuario.model'); // Asegúrate de ajustar la ruta al modelo

exports.createNovedad = async (req, res) => {
  
  try {
    const {
      nombre_cliente,
      descripcion,
      latitud,
      longitud,
      GeneraldeNovedades,
      TipodeNovedades,
      SubTipoNovedades,
      Base
    } = req.body;

    const foto = req.files?.foto?.[0]?.filename || null;
    const video = req.files?.video?.[0]?.filename || null;
    const usuarioId = req.userId;

    const novedad = await NovedadesSerenazgo.create({
      nombre_cliente,
      descripcion,
      latitud,
      longitud,
      foto,
      video,
      usuarioId,
      GeneraldeNovedades,
      TipodeNovedades,
      SubTipoNovedades,
      Base
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
  exports.updateNovedadById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const novedad = await NovedadesSerenazgo.findByPk(id);
      if (!novedad) {
        return res.status(404).json({ error: 'Novedad no encontrada' });
      }
  
      const {
        nombre_cliente,
        descripcion,
        latitud,
        longitud,
        GeneraldeNovedades,
        TipodeNovedades,
        SubTipoNovedades,
        Base
      } = req.body;
  
      const nuevaFoto = req.files?.foto?.[0]?.filename || null;
      const nuevoVideo = req.files?.video?.[0]?.filename || null;
  
      // Actualizar solo si vienen datos nuevos
      novedad.nombre_cliente = nombre_cliente || novedad.nombre_cliente;
      novedad.descripcion = descripcion || novedad.descripcion;
      novedad.latitud = latitud || novedad.latitud;
      novedad.longitud = longitud || novedad.longitud;
      novedad.GeneraldeNovedades = GeneraldeNovedades || novedad.GeneraldeNovedades;
      novedad.TipodeNovedades = TipodeNovedades || novedad.TipodeNovedades;
      novedad.SubTipoNovedades = SubTipoNovedades || novedad.SubTipoNovedades;
      novedad.Base = Base || novedad.Base;
  
      if (nuevaFoto) novedad.foto = nuevaFoto;
      if (nuevoVideo) novedad.video = nuevoVideo;
  
      await novedad.save();
  
      res.json({ message: 'Novedad actualizada correctamente', novedad });
    } catch (error) {
      console.error('Error al actualizar la novedad:', error);
      res.status(500).json({ error: 'Error al actualizar la novedad' });
    }
  };