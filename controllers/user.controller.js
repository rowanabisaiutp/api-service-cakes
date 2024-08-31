const User = require('../models/user.model');
const Role = require('../models/roles.model');
const cloudinary = require('../config/cloudinary');
const bcrypt = require('bcryptjs');


// Crear un nuevo usuario
// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
      const { nombre, email, contrasena, telefono, direccion, rol_id, fecha_registro, activo } = req.body;
      let foto_perfil_url = null;
  
      if (req.file) {
        // Subir imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        foto_perfil_url = result.secure_url;
      }
  
      const user = await User.create({
        nombre,
        email,
        contrasena,
        telefono,
        direccion,
        rol_id,
        fecha_registro,
        foto_perfil: foto_perfil_url,
        activo,
      });
  
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Obtener todos los usuarios con la información del rol
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Role, as: 'Role' }], // Utiliza el alias aquí
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un usuario por ID con la información del rol
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Role, as: 'Role' }], // Utiliza el alias aquí
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { nombre, email, contrasena, telefono, direccion, rol_id, fecha_registro, activo } = req.body;
    let foto_perfil_url = req.body.foto_perfil;

    if (req.file) {
      foto_perfil_url = req.file.path;
    }

    // Verifica si se proporcionó una nueva contraseña
    let updatedFields = {
      nombre,
      email,
      telefono,
      direccion,
      rol_id,
      fecha_registro,
      foto_perfil: foto_perfil_url,
      activo,
    };

    // Encripta la contraseña si se proporciona
    if (contrasena) {
      const salt = await bcrypt.genSalt(10); // Genera un "salt"
      updatedFields.contrasena = await bcrypt.hash(contrasena, salt); // Encripta la contraseña
    }

    const [updated] = await User.update(updatedFields, {
      where: { usuario_id: req.params.id },
    });

    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      return res.status(200).json(updatedUser);
    }
    throw new Error('Usuario no encontrado');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { usuario_id: req.params.id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error('Usuario no encontrado');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
