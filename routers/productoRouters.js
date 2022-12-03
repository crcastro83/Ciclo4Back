const express = require("express");
const router = express.Router();
const authMiddelware = require("../middleware/authMiddleware");
const productoController = require("../controllers/productoController");

router.get("/", authMiddelware, productoController.leerProducto);

router.post("/", authMiddelware, productoController.crearProducto);

router.put("/", authMiddelware, productoController.actualizarProducto);

router.delete("/", authMiddelware, productoController.borrarProducto);

module.exports = router;