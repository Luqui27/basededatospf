const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioControllers");
const menuController = require("../controllers/menuController");

// Rutas para usuarios
router.post("/usuarios", usuarioController.createUsuario);
router.get("/usuarios", usuarioController.getUsuarios);
router.put("/usuarios/:id", usuarioController.updateUsuario);
router.put("/usuarios/:id", usuarioController.deleteUsuario);

// Rutas para menús
router.post("/menus", menuController.createMenu);
router.get("/menus", menuController.getMenus);
router.put("/menus/:id", menuController.updateMenu);
router.delete("/menus/:id", menuController.deleteMenu);

module.exports = router;
