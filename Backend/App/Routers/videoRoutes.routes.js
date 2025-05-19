const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');  // Importar la configuración de Multer
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

// Ruta para subir un video
router.post('/upload/video', upload.single('video'), (req, res) => {
  if (req.file) {
    // Ruta original del archivo subido
    const videoPath = path.join(__dirname, '../uploads/videosNovedades', req.file.filename);
    const outputVideoPath = path.join(__dirname, '../uploads/videosNovedades', `${Date.now()}-converted.mp4`);

    // Convertir el video a mp4 usando ffmpeg
    ffmpeg(videoPath)
  .output(outputVideoPath)
  .on('end', () => {
    console.log('Conversión a MP4 terminada.');
    console.log('Ruta del archivo convertido:', outputVideoPath); // Asegúrate de que esta ruta sea válida
    fs.unlinkSync(videoPath);

    // Generar la URL del video convertido
    const videoUrl = `http://192.168.16.246:3003/api/uploads/videosNovedades/${path.basename(outputVideoPath)}`;
    console.log('URL del video:', videoUrl); // Asegúrate de que esta URL sea correcta

    res.json({
      videoUrl,
      message: 'El video se ha subido y convertido correctamente a MP4.'
    });
  })
  .on('error', (err) => {
    console.error('Error al convertir el video:', err);
    res.status(500).json({ error: 'Error al convertir el video a MP4' });
  })
  .run();

  } else {
    res.status(400).json({ error: 'No se subió un archivo de video.' });
  }
});

module.exports = router;