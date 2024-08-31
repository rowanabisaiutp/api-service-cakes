const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('../config/nodemailer'); // Asegúrate de que esta ruta sea correcta

exports.login = async (req, res) => {
  console.log('Request Body:', req.body);

  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    return res.status(400).json({ error: 'El email y la contraseña son obligatorios' });
  }

  try {
    // Buscar al usuario por email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);

    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: user.usuario_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    
    // Configura el correo electrónico de bienvenida
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Bienvenido a Nuestra Plataforma',
      text: `Hola ${user.nombre},\n\nGracias por iniciar sesión en nuestra plataforma. Estamos encantados de tenerte aquí.\n\nSaludos,\nEl equipo de soporte.`,
      html: `<p>Hola ${user.nombre},</p><p>Gracias por iniciar sesión en nuestra plataforma. Estamos encantados de tenerte aquí.</p><p>Saludos,<br>El equipo de soporte.</p>`
    };

    // Envía el correo electrónico
    await nodemailer.sendMail(mailOptions);

    // Devolver el token y los datos del usuario
    res.status(200).json({
      token,
      user: {
        usuario_id: user.usuario_id,
        nombre: user.nombre,
        email: user.email,
        telefono: user.telefono,
        direccion: user.direccion,
        rol_id: user.rol_id,
        fecha_registro: user.fecha_registro,
        foto_perfil: user.foto_perfil,
        activo: user.activo,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
