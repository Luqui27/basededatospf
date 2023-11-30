const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

const registroController = async (req, res) => {
  try {
    const { password, isAdmin, ...restoDatos } = req.body;

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      password: hashedPassword,
      isAdmin: isAdmin || false,
      ...restoDatos,
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    // Generar token
    const token = jwt.sign(
      { id: nuevoUsuario._id, isAdmin: nuevoUsuario.isAdmin },
      JWT_SECRET,
      { expiresIn: "1h" } // Puedes ajustar la duración del token según tus necesidades
    );

    // Enviar token en la respuesta
    res
      .status(200)
      .json({ token, mensaje: "Usuario registrado y logueado exitosamente" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = registroController;
