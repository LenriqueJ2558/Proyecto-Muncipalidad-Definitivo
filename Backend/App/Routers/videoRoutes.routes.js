const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

// 🚫 Tamaño máximo en MB que aceptamos (puedes cambiarlo)
const MAX_FILE_MB = 250;

// Ruta para subir un video
router.post('/upload/video', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió un archivo de video.' });
  }

  // ✅ Validar tamaño del archivo
  const fileSizeMB = req.file.size / (1024 * 1024);
  if (fileSizeMB > MAX_FILE_MB) {
    fs.unlinkSync(req.file.path); // borrar archivo si es muy grande
    return res.status(400).json({
      error: `El video es demasiado grande (${Math.round(fileSizeMB)}MB). El máximo permitido es ${MAX_FILE_MB}MB.`
    });
  }

  const videoPath = path.join(__dirname, '../uploads/videosNovedades', req.file.filename);
  const outputVideoPath = path.join(__dirname, '../uploads/videosNovedades', `${Date.now()}-converted.mp4`);

  ffmpeg(videoPath)
    .inputOptions([
      '-fflags', '+genpts+discardcorrupt',
      '-analyzeduration', '200M',
      '-probesize', '200M'
    ])
    .videoCodec('libx264')
    .audioCodec('aac')
    .outputOptions('-movflags faststart') // hace que el video se cargue más rápido en navegadores
    .output(outputVideoPath)
    .on('end', () => {
      console.log('✅ Conversión completada');
      fs.unlinkSync(videoPath); // eliminar el original
      const videoUrl = `http://192.168.16.246:3003/api/uploads/videosNovedades/${path.basename(outputVideoPath)}`;
      return res.json({
        videoUrl,
        message: 'Video convertido y listo para reproducirse en el navegador.'
      });
    })
    .on('error', (err, stdout, stderr) => {
      console.error('❌ Error ffmpeg:', err.message);
      console.error('STDERR:', stderr);

      // Borra ambos archivos si falla
      try {
        fs.existsSync(videoPath) && fs.unlinkSync(videoPath);
        fs.existsSync(outputVideoPath) && fs.unlinkSync(outputVideoPath);
      } catch (e) {
        console.warn('⚠️ No se pudieron limpiar archivos:', e.message);
      }

      return res.status(500).json({
        error: 'El video no se pudo convertir. Asegúrate de que provenga de una fuente válida y no esté dañado.',
        details: err.message
      });
    })
    .run();
});

module.exports = router;