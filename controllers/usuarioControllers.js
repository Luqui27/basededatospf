const Usuario = require("../models/usuario");

// Crear un usuario
const createUsuario = async (req, res) => {
  try {
    // Agrega console.log para imprimir los datos recibidos
    //console.log("Datos recibidos:", req.body);

    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.status(200).json({ mensaje: "Usuario creado exitosamente" });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Actualizar un usuario
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    // Verificar si otro usuario ya tiene el mismo correo electrónico
    const existingUser = await Usuario.findOne({ email, _id: { $ne: id } });
    if (existingUser) {
      return res.status(400).json({
        error: "El correo electrónico ya está en uso. Por favor, utiliza otro.",
      });
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(usuarioActualizado);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // Actualizar isActive a false en lugar de eliminar
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (usuarioActualizado) {
      res.json({
        mensaje: "Usuario deshabilitado exitosamente",
        usuario: usuarioActualizado,
      });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al deshabilitar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  createUsuario,
  getUsuarios,
  updateUsuario,
  deleteUsuario,
};
