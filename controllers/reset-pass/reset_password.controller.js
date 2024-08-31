// controllers/reset_password.controller.js

const Usuario = require('../../models/user.model');
const ResetPasswordToken = require('../../models/reset-pass/reset_password_tokens.model');
const bcrypt = require('bcryptjs');

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Busca el token de reseteo
        const resetToken = await ResetPasswordToken.findOne({ where: { token, usado: false } });

        if (!resetToken || resetToken.fecha_expiracion < new Date()) {
            return res.status(400).json({ message: 'Token inválido o expirado' });
        }

        // Busca el usuario asociado al token
        const usuario = await Usuario.findByPk(resetToken.usuario_id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Encripta la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualiza la contraseña del usuario
        await usuario.update({ contrasena: hashedPassword });

        // Marca el token como usado
        await resetToken.update({ usado: true });

        res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
