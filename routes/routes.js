const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioControllers");
const menuController = require("../controllers/menuController");
const pedidoController = require("../controllers/pedidoController");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const registroController = require("../controllers/registroController");
const carritoControllers = require("../controllers/carritoControllers");

// Rutas para usuarios
router.post("/usuarios", usuarioController.createUsuario);
router.get("/usuarios", usuarioController.getUsuarios);
router.put("/usuarios/:id", usuarioController.updateUsuario);
router.delete("/usuarios/:id", usuarioController.deleteUsuario);
router.get("/usuarios/:userId", usuarioController.getUsuarioById);

// Rutas para menús
router.post("/menus", menuController.createMenu);
router.get("/menus", menuController.getMenus);
router.get("/menus/:id", menuController.getMenuById);
router.put("/menus/:id", menuController.updateMenu);
router.delete(
  "/menus/:id",
  authMiddleware.verificarToken,
  menuController.deleteMenu
);

// Rutas para pedidos
router.post("/pedidos", pedidoController.createPedido);
router.get("/pedidos", pedidoController.getPedidos);
router.get("/pedidos/:id", pedidoController.getPedidoById);
router.put("/pedidos/:id", pedidoController.updatePedido);
router.put("/pedidos/:id/servido", pedidoController.updateServido); // Nueva ruta para actualizar el estado "Servido" del pedido
router.delete("/pedidos/:id", pedidoController.deletePedido);

//Ruta para login

router.post("/login", authController.login);

// Ruta para registro de usuarios
router.post("/registro", registroController);

//Ruta para carrito

router.post("/carrito/agregar", carritoControllers.agregarAlCarrito);
router.get("/carrito/:usuarioId", carritoControllers.obtenerCarrito);
router.delete(
  "/carrito/eliminar/:usuarioId/:menuId",
  carritoControllers.eliminarMenuDelCarrito
);
router.put(
  "/carrito/actualizar-cantidad/:usuarioId/:menuId",
  carritoControllers.actualizarCantidadProducto
);

module.exports = router;
