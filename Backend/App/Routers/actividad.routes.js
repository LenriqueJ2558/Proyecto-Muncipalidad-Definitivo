const express = require('express')
const router = express.Router()
const {crearActividad,actualizarActividadPorEmpleadoDni,eliminarActividadPorEmpleadoDni,obtenerActividades,obtenerActividadesPorEmpleadoDni}= require('../Controller/actividad')
const { authJwt } = require("../middleware");


router.get('/actividad', obtenerActividades)
router.get('/actividad/:dni',obtenerActividadesPorEmpleadoDni)
router.post('/actividad',crearActividad)
router.put('/actividad/:dni',actualizarActividadPorEmpleadoDni)
router.delete('/actividad/:dni', eliminarActividadPorEmpleadoDni)

module.exports = router