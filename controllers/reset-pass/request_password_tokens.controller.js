// controllers/request_password_reset.controller.js

const ResetPasswordToken = require('../../models/reset-pass/reset_password_tokens.model');
const Usuario = require('../../models/user.model');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

// Configura el transportador de correo
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ojedakumulrowan@gmail.com',
        pass: 'pfwa yheh gahn froc'
    }
});

exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        // Busca el usuario por su correo electrónico
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Genera un nuevo token de reseteo
        const token = uuidv4();
        const fecha_creacion = new Date();
        const fecha_expiracion = new Date(fecha_creacion.getTime() + 30 * 60 * 1000); // Token válido por 30 minutos

        await ResetPasswordToken.create({
            usuario_id: usuario.usuario_id,
            token,
            fecha_creacion,
            fecha_expiracion,
            usado: false
        });

        // Envía un correo con el enlace de reseteo de contraseña
        const resetLink = `http://your-frontend-app.com/reset-password?token=${token}`;
        await transporter.sendMail({
            to: email,
            subject: 'Solicitud de Reseteo de Contraseña',
            html: `<p>Para restablecer tu contraseña, haz clic en el siguiente enlace: <a href="${resetLink}">Restablecer Contraseña</a></p>`
        });

        res.status(200).json({ message: 'Correo de reseteo enviado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
