const express = require('express');
const roleController = require('../controllers/roles.controller');
const router = express.Router();

// Crear un nuevo rol
router.post('/data', roleController.createRole);

// Obtener todos los roles
router.get('/data', roleController.getAllRoles);

// Obtener un rol por ID
router.get('/data/:id', roleController.getRoleById);

// Actualizar un rol por ID
router.put('/data/:id', roleController.updateRole);

// Eliminar un rol por ID
router.delete('/data/:id', roleController.deleteRole);

module.exports = router;
