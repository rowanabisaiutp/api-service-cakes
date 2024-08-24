// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const usuarioRoutes = require('./routes/usuario-routes');
const authRoutes = require('./routes/authRoutes');
const { swaggerUi, swaggerDocs } = require('./swagger'); // Importar Swagger desde archivo externo

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Implementación de la documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);

app.listen(PORT, async () => {
  console.log('----------------------------------');
  console.log('|', `Server is running on port ${PORT}`, '|');
  console.log('----------------------------------');
  try {
    await sequelize.authenticate();
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log('+', 'Database connection has been established successfully.', '+');
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
