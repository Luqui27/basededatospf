const mongoose = require("mongoose");

const carritoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario", // Referencia al modelo de Usuario
    required: true,
  },
  productos: [
    {
      menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu", // Referencia al modelo de Menu
        required: true,
      },
      nombre: String,
      precio: Number,
      cantidad: {
        type: Number,
        default: 1,
      },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
});

const Carrito = mongoose.model("Carrito", carritoSchema);

module.exports = Carrito;
