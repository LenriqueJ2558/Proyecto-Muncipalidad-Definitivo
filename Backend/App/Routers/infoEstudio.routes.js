const express = require('express')
const router = express.Router()
const {crearInfoEstudio, obtenerInfoEstudios, obtenerInfoEstudiosPorEmpleadoDni, actualizarInfoEstudioPorEmpleadoDni, eliminarInfoEstudioPorEmpleadoDni}= require('../Controller/infoEstudio.controller')
const { authJwt } = require("../middleware");


router.get('/InfoEstudio', obtenerInfoEstudios)
router.get('/InfoEstudio/:dni',obtenerInfoEstudiosPorEmpleadoDni)
router.post('/InfoEstudio',crearInfoEstudio)
router.put('/InfoEstudio/:dni',actualizarInfoEstudioPorEmpleadoDni)
router.delete('/InfoEstudio/:dni', eliminarInfoEstudioPorEmpleadoDni)

module.exports = router