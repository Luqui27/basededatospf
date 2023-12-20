const registroController = async (req, res) => {
  try {
    const { password, isAdmin, ...restoDatos } = req.body;

    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await Usuario.findOne({ email: restoDatos.email });
    if (existingUser) {
      return res.status(409).json({
        error: 'El correo electrónico ya está en uso. Por favor, utiliza otro.',
      });
    }

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
      { expiresIn: '1h' }
    );

    // Setear el token en una cookie
    res.cookie('token', token, { maxAge: 3600000, httpOnly: true });

    // Setear isAdmin en una cookie
    res.cookie('isAdmin', nuevoUsuario.isAdmin, {
      maxAge: 3600000,
      httpOnly: true,
    });

    //setear _id en una cookie
    res.cookie('_id', nuevoUsuario._id, { maxAge: 3600000 });

    // Enviar mensaje en la respuesta con el token y isAdmin
    res.status(200).json({
      token,
      isAdmin: nuevoUsuario.isAdmin,
      _id: nuevoUsuario._id,
      mensaje: 'Usuario registrado y logueado exitosamente',
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = registroController;
