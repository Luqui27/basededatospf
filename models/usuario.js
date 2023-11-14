const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) =>
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value),
      message: "Ingrese un email válido",
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
