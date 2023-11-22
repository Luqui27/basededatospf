const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const Usuario = require("../models/usuario");  // Asegúrate de importar el modelo de Usuario

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por correo electrónico
    const usuario = await Usuario.findOne({ email });

    // Verificar si el usuario existe y la contraseña es válida
    if (usuario && await bcrypt.compare(password, usuario.password)) {
      // Generar token de autenticación
      const token = jwt.sign({ userId: usuario._id }, secretKey, { expiresIn: "1h" });

      // Enviar token como respuesta
      res.json({ token });
    } else {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { login };
