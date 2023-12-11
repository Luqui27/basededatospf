const Pedido = require("../models/pedido");
const Carrito = require("../models/carrito");
const Usuario = require("../models/usuario");
const Menu = require("../models/menu");

const getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los pedidos" });
  }
};

const getPedidoById = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id)
      .populate({
        path: "usuario",
        select: "email name",
      })
      .populate({
        path: "productos.menu",
        select: "nombre detalle precio",
      });

    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los detalles del pedido" });
  }
};

const createPedido = async (req, res) => {
  try {
    const { usuario, productos } = req.body.map((producto) => ({
      menu: producto.menu,
      cantidad: producto.cantidad,
      nombre: producto.nombre,
    }));

    const nuevoPedido = new Pedido({ usuario, productos });
    const pedidoGuardado = await nuevoPedido.save();

    await Carrito.findOneAndUpdate(
      { usuario: usuario },
      { $set: { productos: [], total: 0 } },
      { new: true }
    );

    res.status(201).json({ pedido: pedidoGuardado });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el pedido" });
  }
};

const updatePedido = async (req, res) => {
  try {
    const { usuario, productos } = req.body;
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      req.params.id,
      { usuario, productos },
      { new: true }
    );
    res.json({ pedido: pedidoActualizado });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el pedido" });
  }
};

const deletePedido = async (req, res) => {
  try {
    await Pedido.findByIdAndDelete(req.params.id);
    res.json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el pedido" });
  }
};

module.exports = {
  getPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido,
};
