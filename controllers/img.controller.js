const cloudinary = require('../config/cloudinary'); // Asegúrate de tener la configuración correcta
const ImagenesPasteles = require('../models/img.model');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Usamos memoria en lugar de almacenamiento en disco

// Crear una nueva imagen
exports.createImage = async (req, res) => {
  upload.single('imagen')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const { pastel_id } = req.body;
      const file = req.file; // Archivo subido

      // Si no hay archivo subido, responder con error
      if (!file) {
        return res.status(400).json({ error: 'No se subió ninguna imagen' });
      }

      // Subir la imagen a Cloudinary
      const result = await cloudinary.uploader.upload_stream(
        { folder: 'pasteles_images', allowed_formats: ['jpg', 'png', 'jpeg'] },
        (error, result) => {
          if (error) {
            return res.status(500).json({ error: error.message });
          }

          // Crear entrada en la base de datos
          ImagenesPasteles.create({
            pastel_id,
            imagen: result.secure_url, // URL de la imagen en Cloudinary
            descripcion: req.body.descripcion || ''
          }).then(nuevaImagen => {
            res.status(201).json(nuevaImagen);
          }).catch(error => {
            res.status(500).json({ error: error.message });
          });
        }
      ).end(file.buffer); // Usamos el buffer de la imagen en memoria
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

// Obtener todas las imágenes
exports.getAllImages = async (req, res) => {
  try {
    const images = await ImagenesPasteles.findAll();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una imagen por su ID
exports.getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await ImagenesPasteles.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una imagen
exports.updateImage = async (req, res) => {
  upload.single('imagen')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const { id } = req.params;
      const { pastel_id, descripcion } = req.body;
      const file = req.file;

      const image = await ImagenesPasteles.findByPk(id);
      if (!image) {
        return res.status(404).json({ error: 'Imagen no encontrada' });
      }

      let imagenUrl = image.imagen;

      if (file) {
        // Subir la nueva imagen a Cloudinary
        const result = await cloudinary.uploader.upload_stream(
          { folder: 'pasteles_images', allowed_formats: ['jpg', 'png', 'jpeg'] },
          (error, result) => {
            if (error) {
              return res.status(500).json({ error: error.message });
            }

            imagenUrl = result.secure_url;

            ImagenesPasteles.update({
              pastel_id: pastel_id || image.pastel_id,
              imagen: imagenUrl,
              descripcion: descripcion || image.descripcion
            }, {
              where: { imagen_id: id }
            }).then(updatedImage => {
              res.status(200).json(updatedImage);
            }).catch(error => {
              res.status(500).json({ error: error.message });
            });
          }
        ).end(file.buffer); // Usamos el buffer de la imagen en memoria
      } else {
        const updatedImage = await ImagenesPasteles.update({
          pastel_id: pastel_id || image.pastel_id,
          descripcion: descripcion || image.descripcion
        }, {
          where: { imagen_id: id }
        });
        res.status(200).json(updatedImage);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

// Eliminar una imagen
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await ImagenesPasteles.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    await ImagenesPasteles.destroy({
      where: { imagen_id: id }
    });

    res.status(200).json({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
