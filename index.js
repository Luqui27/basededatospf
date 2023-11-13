const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configurar CORS antes de definir rutas
app.use(cors());

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conexión a MongoDB establecida");
  })
  .catch((err) => {
    console.error("Error de conexión a MongoDB:", err);
  });

// Configuración de rutas y middleware
app.use("/api", routes);

// Manejo de rutas de prueba
app.get("/", (req, res) => {
  res.send("Base de datos conectada");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
