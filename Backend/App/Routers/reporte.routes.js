const express = require('express');
const router = express.Router();
const { obtenerReportePersonal } = require('../Controller/reportePersonal.controller'); // Ajusta la ruta según tu estructura de carpetas

// Ruta para obtener el reporte personal
router.get('/reporte-personal', obtenerReportePersonal);

module.exports = router;