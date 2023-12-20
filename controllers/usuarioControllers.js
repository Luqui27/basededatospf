const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Crear un usuario
const createUsuario = async (req, res) => {
  try {
    const { password, ...restoDatos } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const nuevoUsuario = new Usuario({
      password: hashedPassword,
      ...restoDatos,
    });
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
    const { password, ...restoDatos } = req.body;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      req.body.password = hashedPassword;
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, restoDatos, {
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

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
  try {
    const { userId } = req.params;
    const usuario = await Usuario.findById(userId);

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
};
