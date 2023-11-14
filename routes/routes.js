const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioControllers");

// Rutas para usuarios
router.post("/usuarios", usuarioController.createUsuario);
router.get("/usuarios", usuarioController.getUsuarios);
router.put("/usuarios/:id", usuarioController.updateUsuario);
router.put("/usuarios/:id", usuarioController.deleteUsuario);

module.exports = router;
