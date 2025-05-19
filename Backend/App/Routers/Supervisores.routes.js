const express = require('express');
const router = express.Router();
const { getSupervisoresCamara , getOperadoresCamara } = require('../Controller/NombreSupervisorCamara.controller'); // Ajusta la ruta según tu estructura de carpetas

// Ruta para obtener el reporte personal
router.get('/Supervisor-Nombre-Camara', getSupervisoresCamara);
router.get('/Operador-Nombre-Camara', getOperadoresCamara);
module.exports = router;