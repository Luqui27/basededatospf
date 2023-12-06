const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  fecha: {
    type: Date,
    required: true,
  },
  menu: [
    {
      type: String,
      minlength: 3,
      maxlength: 50,
    },
  ],
  servido: {
    type: Boolean,
    default: false,
  },
});

const Pedido = mongoose.model("Pedido", pedidoSchema);

module.exports = Pedido;
