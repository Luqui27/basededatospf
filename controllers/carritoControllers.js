const Carrito = require("../models/carrito");
const Usuario = require("../models/usuario");
const Menu = require("../models/menu");

const agregarAlCarrito = async (req, res) => {
  try {
    const { usuarioId, menuId } = req.body;

    // Verificar si el usuario y el menú existen
    const usuario = await Usuario.findById(usuarioId);
    const menu = await Menu.findById(menuId);

    if (!usuario || !menu) {
      return res.status(404).json({ error: "Usuario o menú no encontrado" });
    }

    // Buscar el carrito del usuario
    let carrito = await Carrito.findOne({ usuario: usuarioId });

    // Si el carrito no existe, créalo
    if (!carrito) {
      carrito = new Carrito({ usuario: usuarioId });
    }

    // Verificar si el producto ya está en el carrito
    const productoIndex = carrito.productos.findIndex(
      (producto) => producto.menu.toString() === menuId
    );

    if (productoIndex !== -1) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      carrito.productos[productoIndex].cantidad += 1;
    } else {
      // Si el producto no está en el carrito, agrégalo
      carrito.productos.push({
        menu: menuId,
        nombre: menu.name,
        precio: menu.price,
      });
    }

    // Actualizar el total del carrito
    carrito.total = carrito.productos.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );

    // Guardar el carrito actualizado en la base de datos
    await carrito.save();

    res.status(201).json({ mensaje: "Producto agregado al carrito con éxito" });
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { agregarAlCarrito };
