const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    required: true,
  },
  detail: {
    type: String,
    minlength: 10,
    maxlength: 200,
  },
  category: {
    type: String,
    enum: ['Entradas', 'Plato Principal', 'Guarniciones', 'Sopas y Cremas', 'Pizzas', 'Postres', 'Bebidas', 'Especiales de la Casa'],
    required: true,
  },
  url: {
    type: String,
    validate: {
      validator: (value) => /^https?:\/\/\S+$/.test(value),
      message: "Ingrese una URL válida",
    },
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
