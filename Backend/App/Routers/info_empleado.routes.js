const express = require('express')
const router = express.Router()
const {crearInfoEmpleado, obtenerInfoEmpleados, obtenerInfoEmpleadoPorDni, actualizarInfoEmpleadoPorDni, eliminarInfoEmpleadoPorDni}= require('../Controller/info_empleado.controller')
const { authJwt } = require("../middleware");


router.get('/InfoEmpleado', obtenerInfoEmpleados)
router.get('/InfoEmpleado/:dni',obtenerInfoEmpleadoPorDni)
router.post('/InfoEmpleado',crearInfoEmpleado)
router.put('/InfoEmpleado/:dni',actualizarInfoEmpleadoPorDni)
router.delete('/InfoEmpleado/:dni', eliminarInfoEmpleadoPorDni)

module.exports = router