
const fs = require('fs');
const path = require('path');
const NovedadesCamara = require('../Models/NovedadesCamara.model');

// Crear una nueva novedad de cámara
const createNovedadesCamara = async (req, res) => {
  try {
    console.log("🔹 Archivos recibidos:", req.files);
    console.log("🔹 Datos del body:", req.body);

    const {
      NombreSupervisor, NombreOperador, Turno, Fecha, GeneralDeNovedades,
      TipoDeNovedades, SubTipoNovedades, NumeroDeEstacion, DescripciondeNovedad,
      ubicacion_novedades, hora_novedades, Estado, UbiCamara, Lat, Longitud, Localizacion
    } = req.body;

    // Verificar que los archivos de video e imagen existan
    const video = req.files?.['video']?.[0] || null;
    const imagen = req.files?.['imagen']?.[0] || null;

    console.log("📌 Video recibido:", video);
    console.log("📌 Imagen recibida:", imagen);

    if (!video && !imagen) {
      console.warn("⚠️ No se recibió ni video ni imagen.");
      return res.status(400).json({ msg: 'Debe subir al menos un archivo' });
    }

    // Generar las rutas para los archivos
    const videoPath = video ? `/uploads/videosNovedades/${video.filename}` : null;
    const imagenPath = imagen ? `/uploads/imagenesNovedades/${imagen.filename}` : null;

    console.log("📌 Ruta del video:", videoPath);
    console.log("📌 Ruta de la imagen:", imagenPath);

    // Crear la URL completa del video
    const videoUrl = video ? `http://192.168.16.246:3003/api${videoPath}` : null;

    // Guardar los datos en la base de datos
    const createdNovedades = await NovedadesCamara.create({
      NombreSupervisor, NombreOperador, Turno, Fecha, GeneralDeNovedades,
      TipoDeNovedades, SubTipoNovedades, NumeroDeEstacion, DescripciondeNovedad,
      Foto: imagenPath,  // Guardamos la ruta de la imagen
      UrlVideo: videoUrl,  // Guardamos la URL completa del video
      ubicacion_novedades, hora_novedades, Estado, UbiCamara, Lat, Longitud, Localizacion
    });

    console.log("✅ Novedad creada en la base de datos:", createdNovedades);

    return res.status(201).json({
      msg: 'Novedad creada con éxito',
      videoUrl,  // Incluimos la URL del video en la respuesta
      createdNovedades,
    });

  } catch (error) {
    console.error('🚨 Error creando novedades de cámara:', error);
    return res.status(500).json({ msg: 'Error creando novedades de cámara', error: error.message });
  }
};

// Actualizar una novedad de cámara
const updateNovedadesCamara = async (req, res) => {
    try {
        const idNovedades = req.params.idNovedades;

        if (!idNovedades) {
            return res.status(400).json({ error: 'El parámetro idNovedades no está definido' });
        }

        const {
            NombreSupervisor, NombreOperador, Turno, Fecha, GeneralDeNovedades,
            TipoDeNovedades, SubTipoNovedades, NumeroDeEstacion, DescripciondeNovedad,
            ubicacion_novedades, hora_novedades, Estado, UbiCamara, Lat, Longitud, Localizacion
        } = req.body;

        // Obtén las rutas de los archivos de imagen y video
        const Foto = req.body.Foto; // Ruta de la imagen
        const UrlVideo = req.body.UrlVideo; // Ruta del video

        const existingNovedades = await NovedadesCamara.findOne({ where: { idNovedades } });

        if (!existingNovedades) {
            return res.status(404).json({ error: 'La novedad de cámara a actualizar no existe' });
        }

        await existingNovedades.update({
            NombreSupervisor, NombreOperador, Turno, Fecha, GeneralDeNovedades,
            TipoDeNovedades, SubTipoNovedades, NumeroDeEstacion, DescripciondeNovedad,
            Foto, UrlVideo, ubicacion_novedades, hora_novedades, Estado, UbiCamara, Lat, Longitud, Localizacion
        });

        const updatedNovedades = await NovedadesCamara.findOne({ where: { idNovedades } });
        return res.status(200).json(updatedNovedades);
    } catch (error) {
        console.error('Error actualizando novedades de cámara:', error);
        return res.status(500).json({ error: error.message });
    }
};

// Eliminar una novedad de cámara
const deleteNovedadesCamara = async (req, res) => {
    try {
        const idNovedades = req.params.idNovedades;

        if (!idNovedades) {
            return res.status(400).json({ error: 'El parámetro idNovedades no está definido' });
        }

        const findNovedades = await NovedadesCamara.findOne({ where: { idNovedades } });

        if (!findNovedades) {
            return res.status(404).json({ error: 'La novedad de cámara a eliminar no existe' });
        }

        await NovedadesCamara.destroy({ where: { idNovedades } });

        return res.status(200).json({ message: `La novedad de cámara con el ID: ${idNovedades} ha sido eliminada` });
    } catch (error) {
        console.error('Error al eliminar novedades de cámara:', error);
        return res.status(500).json({ error: error.message });
    }
};

// Obtener todas las novedades de cámaras
const getNovedadesCamara = async (req, res) => {
    try {
        const getAllNovedades = await NovedadesCamara.findAll();
        res.status(200).json(getAllNovedades);
    } catch (error) {
        console.error('Error obteniendo novedades de cámaras:', error);
        return res.status(500).json({ msg: 'Error obteniendo novedades de cámaras' });
    }
};

// Obtener una novedad de cámara por ID
const getNovedadesCamaraById = async (req, res) => {
    const { idNovedades } = req.params;

    try {
        const novedades = await NovedadesCamara.findOne({ where: { idNovedades } });
        if (novedades) {
            res.status(200).json(novedades);
        } else {
            res.status(404).json({ msg: 'Novedad de cámara no encontrada' });
        }
    } catch (error) {
        console.error('Error obteniendo novedad de cámara:', error);
        res.status(500).json({ msg: 'Error obteniendo novedad de cámara' });
    }
};

const getLocalizacionPorUbiCamara = async (req, res) => {
    const { ubiCamara } = req.params; // ubiCamara viene del parámetro de la URL
  
    try {
      // Buscar por UbiCamara en la base de datos
      const novedad = await NovedadesCamara.findOne({
        where: { UbiCamara: ubiCamara },
        attributes: ['UbiCamara', 'Lat', 'Longitud'], // Solo traer los atributos necesarios
      });
  
      if (!novedad) {
        return res.status(404).json({ message: 'Cámara no encontrada' });
      }
  
      // Crear la URL de Google Maps basada en las coordenadas
      const localizacionUrl = `https://www.google.com/maps/search/?api=1&query=${novedad.Lat},${novedad.Longitud}`;
  
      // Formatear la respuesta con los campos requeridos
      const resultado = {
        "CAMARA": novedad.UbiCamara,
        "LAT": novedad.Lat,
        "LOG": novedad.Longitud,
        "LOCALIZACION": localizacionUrl
      };
  
      // Enviar la respuesta
      return res.json(resultado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error del servidor' });
    }
  };
  

module.exports = { createNovedadesCamara, updateNovedadesCamara, deleteNovedadesCamara, getNovedadesCamara, getNovedadesCamaraById , getLocalizacionPorUbiCamara };