const express = require('express');

// Importar todas las rutas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/roles.routes');
const permissionRoutes = require('./routes/routes.permisos');
const rolePermissionRoutes = require('./routes/roles-permisos/r-p.routes');
const categoriasRoutes = require('./routes/categoria.routes');
const pastelesRoutes = require('./routes/pasteles.routes');
const imagenesPastelesRoutes = require('./routes/img.routes');
const ingredienteRoutes = require('./routes/ingrdientes.routes');
const pastelesIngredientesRoutes = require('./routes/pasteles_ingredientes.routes');
const pedidosRoutes = require('./routes/pedidos.routes');
const detallesPedidoRoutes = require('./routes/detalles_pedido.routes');
const comentariosRoutes = require('./routes/comentarios.routes');
const pagosRoutes = require('./routes/pagos.routes');
const favoritosRoutes = require('./routes/favoritos.routes');
const carritosRoutes = require('./routes/carritos.routes');
const carritosPastelesRoutes = require('./routes/carritos_pasteles.routes');
const descuentosRoutes = require('./routes/descuentos.routes');
const pastelesDescuentosRoutes = require('./routes/pasteles_descuentos.routes');
const requestPasswordResetRoutes = require('./routes/reset-pass/request_password_tokens.routes');
const resetPasswordRoutes = require('./routes/reset-pass/reset_password.routes');



// Crear un enrutador
const router = express.Router();

// Usar todas las rutas
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/permisos', permissionRoutes);
router.use('/r-p', rolePermissionRoutes);
router.use('/categorias', categoriasRoutes);
router.use('/pasteles', pastelesRoutes);
router.use('/img', imagenesPastelesRoutes);
router.use('/ingredientes', ingredienteRoutes);
router.use('/pasteles-ingredientes', pastelesIngredientesRoutes);
router.use('/pedidos', pedidosRoutes);
router.use('/detalles', detallesPedidoRoutes);
router.use('/comentarios', comentariosRoutes);
router.use('/pagos', pagosRoutes);
router.use('/favoritos', favoritosRoutes);
router.use('/carrito', carritosRoutes);
router.use('/carritos_pasteles', carritosPastelesRoutes);
router.use('/descuentos', descuentosRoutes);
router.use('/pasteles-descuentos', pastelesDescuentosRoutes);
router.use('/reset-password', requestPasswordResetRoutes);
router.use('/reset-password', resetPasswordRoutes);

module.exports = router;
