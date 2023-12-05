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
      const token = jwt.sign(
        { userId: usuario._id, isAdmin: usuario.isAdmin },
        secretKey,
        {
          expiresIn: "1h",
        }
      );

      // Configurar la cookie con el token y isAdmin
      res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // maxAge is in milliseconds (1 hour)
      res.cookie("isAdmin", usuario.isAdmin, { maxAge: 3600000 }); // maxAge is in milliseconds (1 hour)
      res.cookie("_id", usuario._id, { maxAge: 3600000 });

      // Enviar una respuesta JSON al cliente con información relevante
      res.json({
        token,
        isAdmin: usuario.isAdmin,
        id: usuario._id,
        // Puedes incluir otros detalles del usuario aquí si es necesario
      });
    } else {
      // Si las credenciales no son válidas, enviar un error de no autorizado
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  } catch (error) {
    // Manejar errores internos del servidor
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { login };
