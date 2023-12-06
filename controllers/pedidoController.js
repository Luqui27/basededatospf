const Pedido = require("../models/pedido");

// Crear un pedido
const createPedido = async (req, res) => {
  try {
    const nuevoPedido = new Pedido(req.body);
    await nuevoPedido.save();
    res
      .status(200)
      .json({ mensaje: "Pedido creado exitosamente", pedido: nuevoPedido });
  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener todos los pedidos
const getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Actualizar un pedido
const updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoActualizado = await Pedido.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(pedidoActualizado);
  } catch (error) {
    console.error("Error al actualizar pedido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar un pedido
const deletePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoEliminado = await Pedido.findByIdAndDelete(id);

    if (pedidoEliminado) {
      res.json({
        mensaje: "Pedido eliminado exitosamente",
        pedido: pedidoEliminado,
      });
    } else {
      res.status(404).json({ error: "Pedido no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar pedido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  createPedido,
  getPedidos,
  updatePedido,
  deletePedido,
};
