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
      nombre: {
        type: String, // Puedes ajustar el tipo de datos según la estructura de tu aplicación
        required: true,
      },
    },
  ],
  fecha: {
    type: Date,
    default: Date.now,
  },
  servido: {
    type: Boolean,
    default: false,
  },
});

const Pedido = mongoose.model("Pedido", pedidoSchema);

module.exports = Pedido;
