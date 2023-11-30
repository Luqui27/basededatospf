const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const Usuario = require("../models/usuario");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por correo electrónico
    const usuario = await Usuario.findOne({ email });

    // Verificar si el usuario existe y la contraseña es válida
    if (usuario && (await bcrypt.compare(password, usuario.password))) {
      // Generar token de autenticación
      const token = jwt.sign({ userId: usuario._id }, secretKey, {
        expiresIn: "1h",
      });

      // Incluir el isAdmin en la respuesta
      res.json({
        token,
        isAdmin: usuario.isAdmin,
        // Puedes incluir otros detalles del usuario aquí si es necesario
      });
    } else {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { login };
