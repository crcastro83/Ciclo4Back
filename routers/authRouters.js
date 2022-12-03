const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddelware = require("../middleware/authMiddleware");


router.post(
    "/",
    authController.autenticarUsuario
);

router.get("/" , authMiddelware, authController.usuarioAutenticado);


module.exports = router;