// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuarios',
      version: '1.0.0',
      description: 'API para la gestión de usuarios en un sistema de ventas de pasteles.',
    },
    components: {
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            usuario_id: {
              type: 'integer',
              description: 'ID del usuario',
            },
            nombre: {
              type: 'string',
              description: 'Nombre del usuario',
            },
            email: {
              type: 'string',
              description: 'Email del usuario',
            },
            contrasena: {
              type: 'string',
              description: 'Contraseña del usuario',
            },
            telefono: {
              type: 'string',
              description: 'Teléfono del usuario',
            },
            direccion: {
              type: 'string',
              description: 'Dirección del usuario',
            },
            rol_id: {
              type: 'integer',
              description: 'ID del rol del usuario',
            },
            fecha_registro: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de registro del usuario',
            },
            activo: {
              type: 'boolean',
              description: 'Estado del usuario (activo o no)',
            },
            foto_perfil: {
              type: 'string',
              format: 'binary',
              description: 'Foto de perfil del usuario',
            },
          },
        },
        UsuarioInput: {
          type: 'object',
          properties: {
            nombre: { type: 'string' },
            email: { type: 'string' },
            contrasena: { type: 'string' },
            telefono: { type: 'string' },
            direccion: { type: 'string' },
            rol_id: { type: 'integer' },
            activo: { type: 'boolean' },
            foto_perfil: { type: 'string', format: 'binary' },
          },
          required: ['nombre', 'email', 'contrasena', 'rol_id', 'activo'],
        },
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'], // Ruta a los archivos donde se documentarán los endpoints
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
