const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token ha expirado" });
      } else {
        return res.status(401).json({ error: "Token inválido" });
      }
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = { verificarToken };
