const express = require('express');
const router = express.Router();
const { getEmpleado, createEmpleado, updateEmpleado, deleteEmpleado, getEmpleadoByDNI } = require('../Controller/empleado.controller');
const multer = require('multer');
const path = require('path');
const { authJwt } = require("../middleware");

// Configurar almacenamiento local con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../imagenesEmpleados')); // Especifica la carpeta de destino
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Nombra el archivo con una marca de tiempo para evitar duplicados
  }
});

const parser = multer({ storage });

// Rutas corregidas
router.get('/empleado', getEmpleado);
router.get('/empleado/:dni', getEmpleadoByDNI);
router.post('/empleado', parser.fields([{ name: 'image', maxCount: 1 }]), createEmpleado);
router.put('/empleado/:Dni', parser.fields([{ name: 'image', maxCount: 1 }]), updateEmpleado);
router.delete('/empleado/:Dni', [authJwt.verifyToken, authJwt.isAdmin], deleteEmpleado);

module.exports = router;