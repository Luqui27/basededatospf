const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema({
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
      cantidad: {
        type: Number,
        required: true,
      },
    },
  ],
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Pedido = mongoose.model("Pedido", pedidoSchema);

module.exports = Pedido;
