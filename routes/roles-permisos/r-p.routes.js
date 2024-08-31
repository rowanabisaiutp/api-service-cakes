// routes/roles_permissions.routes.js
const express = require('express');
const rolePermissionController = require('../../controllers/roles-permisos/r-p.controller');
const router = express.Router();

// Rutas para Roles_Permisos
router.get('/data', rolePermissionController.getAllRolePermissions);
router.get('/data/:rol_id/:permiso_id', rolePermissionController.getRolePermissionById);
router.post('/data', rolePermissionController.createRolePermission);
router.put('/data/:rol_id/:permiso_id', rolePermissionController.updateRolePermission)
router.delete('/data/:rol_id/:permiso_id', rolePermissionController.deleteRolePermission);

module.exports = router;
