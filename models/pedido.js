// pedidoModel.js

const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario", // Referencia al modelo de Usuario
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu", // Referencia al modelo de Menu
    required: true,
  },
  servido: {
    type: Boolean,
    default: false,
  },
});

const Pedido = mongoose.model("Pedido", pedidoSchema);

module.exports = Pedido;
