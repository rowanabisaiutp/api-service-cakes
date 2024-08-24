const express = require('express');
const multer = require('../middlewares/multer'); // Middleware para manejar archivos
const usuarioController = require('../controllers/usuario');
const router = express.Router();

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios (con filtros opcionales)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Nombre del usuario (filtro parcial)
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Email del usuario (filtro parcial)
 *       - in: query
 *         name: telefono
 *         schema:
 *           type: string
 *         description: Teléfono del usuario (filtro parcial)
 *       - in: query
 *         name: rol_id
 *         schema:
 *           type: integer
 *         description: ID del rol del usuario
 *       - in: query
 *         name: activo
 *         schema:
 *           type: boolean
 *         description: Estado de actividad del usuario
 *     responses:
 *       200:
 *         description: Lista de usuarios con información del rol
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   usuario_id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   email:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   direccion:
 *                     type: string
 *                   rol_id:
 *                     type: integer
 *                   fecha_registro:
 *                     type: string
 *                     format: date-time
 *                   activo:
 *                     type: boolean
 *                   foto_perfil:
 *                     type: string
 *                   rol:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                       descripcion:
 *                         type: string
 */

router.get('/', usuarioController.getAllUsuario);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error en la solicitud
 */
router.post('/', multer.single('foto_perfil'), usuarioController.createUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', usuarioController.getUsuarioById);

/**
 * @swagger
 * /api/usuarios/search:
 *   get:
 *     summary: Busca usuarios utilizando filtros
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Nombre del usuario (filtro parcial)
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Email del usuario (filtro parcial)
 *       - in: query
 *         name: telefono
 *         schema:
 *           type: string
 *         description: Teléfono del usuario (filtro parcial)
 *       - in: query
 *         name: rol_id
 *         schema:
 *           type: integer
 *         description: ID del rol del usuario
 *       - in: query
 *         name: activo
 *         schema:
 *           type: boolean
 *         description: Estado de actividad del usuario
 *     responses:
 *       200:
 *         description: Lista de usuarios filtrada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get('/search', usuarioController.searchUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: Error en la solicitud
 */
router.put('/:id', multer.single('foto_perfil'), usuarioController.updateUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;
