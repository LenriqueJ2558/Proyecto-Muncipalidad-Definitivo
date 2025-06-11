const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // Ajusta la ruta según tu estructura

const { createNovedadesCamara, updateNovedadesCamara, deleteNovedadesCamara, getNovedadesCamara, getNovedadesCamaraById, getLocalizacionPorUbiCamara } = require('../Controller/NovedadesCamaras');

// Rutas para Novedades de Cámaras
router.get('/novedades-camara', getNovedadesCamara);
router.get('/novedades-camara/:idNovedades', getNovedadesCamaraById);
router.post('/novedades-camara', upload.fields([{ name: 'video' }, { name: 'imagen' }]), createNovedadesCamara); // Asegúrate de que los nombres coincidan con los campos del formulario
router.put('/novedades-camara/:idNovedades',upload.fields([{ name: 'video' }, { name: 'imagen' }]), updateNovedadesCamara);
router.delete('/novedades-camara/:idNovedades', deleteNovedadesCamara);
router.get('/localizacion/:ubiCamara', getLocalizacionPorUbiCamara);

module.exports = router;