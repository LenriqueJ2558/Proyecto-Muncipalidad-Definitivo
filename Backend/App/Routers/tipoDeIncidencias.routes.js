const express = require('express');
const router = express.Router();
const { obtenerIncidenciaPorCodigo } = require('../Controller/TipoIndicencia.controller');

// Define la ruta de la API para obtener una incidencia por código
router.get('/Incidencia/:codigo', obtenerIncidenciaPorCodigo);

module.exports = router;