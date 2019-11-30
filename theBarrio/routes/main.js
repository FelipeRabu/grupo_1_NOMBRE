// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

/* GET - home page. */
router.get('/', mainController.root);

router.get('/producto', mainController.producto);

router.get('/carrito', mainController.carrito);

router.get('/registro', mainController.registro);

router.get('/carga-de-productos', mainController.cargaProducto);

module.exports = router;
