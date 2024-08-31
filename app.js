const express = require('express');
const sequelize = require('./config/database');
const routes = require('.');  // Importar todas las rutas

const app = express();
app.use(express.json());

// Usar todas las rutas bajo el prefijo `/api`
app.use('/api', routes);

sequelize.sync({ force: false })
  .then(() => {
    console.log('###############################');
    console.log('# Base de datos sincronizada #');
    console.log('###############################');
    console.log('# bienvenido a mi servicio #');
    console.log('###############################');
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('|--------------------------------------|');
  console.log(`| Servidor corriendo en el puerto ${PORT} |`);
  console.log('|--------------------------------------|');
});
