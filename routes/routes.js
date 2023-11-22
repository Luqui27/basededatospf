const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioControllers");
const menuController = require("../controllers/menuController");
const pedidoController = require("../controllers/pedidoController");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware")

// Rutas para usuarios
router.post("/usuarios", usuarioController.createUsuario);
router.get("/usuarios", authMiddleware.verificarToken, usuarioController.getUsuarios);
router.put("/usuarios/:id", authMiddleware.verificarToken, usuarioController.updateUsuario);
router.delete("/usuarios/:id", authMiddleware.verificarToken, usuarioController.deleteUsuario);

// Rutas para menús
router.post("/menus", authMiddleware.verificarToken, menuController.createMenu);
router.get("/menus", menuController.getMenus);
router.put("/menus/:id", authMiddleware.verificarToken, menuController.updateMenu);
router.delete("/menus/:id", authMiddleware.verificarToken, menuController.deleteMenu);

// Rutas para pedidos
router.post("/pedidos", authMiddleware.verificarToken, pedidoController.createPedido);
router.get("/pedidos", authMiddleware.verificarToken, pedidoController.getPedidos);
router.put("/pedidos/:id", authMiddleware.verificarToken, pedidoController.updatePedido);
router.delete("/pedidos/:id", authMiddleware.verificarToken, pedidoController.deletePedido);

router.post("/login", authController.login);

module.exports = router;
