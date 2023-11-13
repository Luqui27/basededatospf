const Usuario = require("../models/usuario");

// Crear un usuario
const createUsuario = async (req, res) => {
  try {
    // Agrega console.log para imprimir los datos recibidos
    console.log("Datos recibidos:", req.body);

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
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(usuarioActualizado);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  createUsuario,
  getUsuarios,
  updateUsuario,
  deleteUsuario,
};
