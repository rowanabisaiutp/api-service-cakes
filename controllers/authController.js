// controllers/usuario.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, Sequelize } = require('../models'); // Importar Sequelize
const { Op } = Sequelize; // Importar Op

// ... otros métodos

// Login de usuario
exports.loginUsuario = async (req, res) => {
  const { emailOrUsername, contrasena } = req.body;

  try {
    // Buscar al usuario por email o nombre de usuario
    const usuario = await Usuario.findOne({
      where: {
        [Op.or]: [
          { email: emailOrUsername },
          { nombre: emailOrUsername }
        ]
      }
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: usuario.usuario_id, email: usuario.email },
      process.env.JWT_SECRET, // Asegúrate de definir este secreto en tu archivo .env
      { expiresIn: '1h' } // Tiempo de expiración del token
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
