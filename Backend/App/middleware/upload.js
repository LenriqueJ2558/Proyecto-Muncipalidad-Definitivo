const multer = require('multer');
const path = require('path');

// Configuración de multer para almacenar archivos en carpetas diferentes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define la carpeta de destino basada en el tipo de archivo
    if (file.mimetype.startsWith('image/')) {
      cb(null, path.join(__dirname, '../uploads/imagenesNovedades'));
    } else if (file.mimetype.startsWith('video/')) {
      cb(null, path.join(__dirname, '../uploads/videosNovedades'));
    } else {
      // Si el archivo no es ni una imagen ni un video, rechaza la carga
      cb(new Error('Tipo de archivo no permitido'), false);
    }
  },
  filename: (req, file, cb) => {
    // Genera un nombre único para los archivos subidos
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage ,  limits: {
  fileSize: 1024 * 1024 * 500 // 500 MB
}});

module.exports = upload;