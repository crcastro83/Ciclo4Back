const express = require("express");
const router = express.Router();
const authMiddelware = require("../middleware/authMiddleware");
const categoriaController =require("../controllers/categoriaController");

router.get("/", authMiddelware, categoriaController.leerCategoria);

router.post("/", authMiddelware, categoriaController.crearCategoria);

router.put("/:id", authMiddelware, categoriaController.actualizarCategoria);

router.delete("/:id", authMiddelware, categoriaController.borrarCategoria);

module.exports = router;