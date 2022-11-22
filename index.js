const express = require("express");
const conectarDB = require("./config/db");
const usuarioRouters = require("./routers/usuarioRouters");


//conectar a la base de datos
conectarDB();

const app = express();

//habilitar express.jason
app.use(express.json({extended : true}));

//rutas o router
app.use("/api/usuarios", usuarioRouters);

app.listen(4000, () => {
    console.log("servidor corriendo en el puerto 4000");
});