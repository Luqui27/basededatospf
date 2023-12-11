const Pedido = require("../models/pedido");

// Obtener todos los pedidos
const getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los pedidos" });
  }
};

// Obtener detalles de un pedido específico
const getPedidoById = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id)
      .populate("usuario", "email") // Incluir detalles del usuario
      .populate("productos.menu", "nombre detalle precio"); // Incluir detalles de los productos

    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los detalles del pedido" });
  }
};

// Crear un nuevo pedido
const createPedido = async (req, res) => {
  try {
    const { usuario, productos } = req.body;
    const nuevoPedido = new Pedido({ usuario, productos });
    const pedidoGuardado = await nuevoPedido.save();
    res.status(201).json({ pedido: pedidoGuardado });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el pedido" });
  }
};

// Actualizar un pedido existente
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

// Eliminar un pedido
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
