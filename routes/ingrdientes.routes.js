const express = require('express');
const router = express.Router();
const ingredienteController = require('../controllers/ingredientes.controller');

router.get('/data', ingredienteController.getIngredientes);
router.get('/data/:ingrediente_id', ingredienteController.getIngredienteById);
router.post('/data', ingredienteController.createIngrediente);
router.put('/data/:ingrediente_id', ingredienteController.updateIngrediente);
router.delete('/data/:ingrediente_id', ingredienteController.deleteIngrediente);

module.exports = router;
