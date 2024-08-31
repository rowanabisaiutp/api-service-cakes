const express = require('express');
const userController = require('../controllers/user.controller');
const upload = require('../config/multer');
const router = express.Router();

// Crear un nuevo usuario
router.post('/data', upload.single('foto_perfil'), userController.createUser);

// Obtener todos los usuarios con detalles del rol
router.get('/data', userController.getAllUsers);

// Obtener un usuario por ID con detalles del rol
router.get('/data/:id', userController.getUserById);

// Actualizar un usuario por ID
router.put('/data/:id', upload.single('foto_perfil'), userController.updateUser);

// Eliminar un usuario por ID
router.delete('/data/:id', userController.deleteUser);

module.exports = router;
