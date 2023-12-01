const registroController = async (req, res) => {
  try {
    const { email, password, isAdmin, ...restoDatos } = req.body;

    // Verificar si el correo electrónico ya existe
    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
      // Si el correo electrónico ya está en uso, devuelve un estado 409 Conflict
      return res.status(409).json({
        error: "El correo electrónico ya está en uso. Por favor, utiliza otro.",
      });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      email,
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

    // Enviar token y isAdmin en la respuesta
    res.status(200).json({
      token,
      isAdmin: nuevoUsuario.isAdmin,
      mensaje: "Usuario registrado y logueado exitosamente",
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = registroController;
