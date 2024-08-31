// routes/permissions.routes.js
const express = require('express');
const permissionController = require('../controllers/permisos.controller');
const router = express.Router();

router.get('/data', permissionController.getAllPermissions);
router.get('/data/:id', permissionController.getPermissionById);
router.post('/data', permissionController.createPermission);
router.put('/data/:id', permissionController.updatePermission);
router.delete('/data/:id', permissionController.deletePermission);

module.exports = router;
