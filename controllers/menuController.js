const Menu = require("../models/menu");

// Crear un menú
const createMenu = async (req, res) => {
  try {
    const nuevoMenu = new Menu(req.body);
    await nuevoMenu.save();
    res.status(200).json({ mensaje: "Menú creado exitosamente", menu: nuevoMenu });
  } catch (error) {
    console.error("Error al crear menú:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener todos los menús
const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (error) {
    console.error("Error al obtener menús:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Actualizar un menú
const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menuActualizado = await Menu.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(menuActualizado);
  } catch (error) {
    console.error("Error al actualizar menú:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar un menú
const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menuEliminado = await Menu.findByIdAndDelete(id);

    if (menuEliminado) {
      res.json({
        mensaje: "Menú eliminado exitosamente",
        menu: menuEliminado,
      });
    } else {
      res.status(404).json({ error: "Menú no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar menú:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu,
};
