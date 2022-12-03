const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");


exports.crearUsuario = async (req, res) => {
    //console.log(req.body);
    const {password, email} = req.body;

    try{

        //declarar usuario, para revisar que sea un unico correo
        let usuario = await Usuario.findOne({email});

        if (usuario){
            return res.status(400).json({msg : "El usuario ya existe"});
        }

        //Crear nuevo usuario
        usuario = new Usuario(req.body);

        //hash
        usuario.password = await bcryptjs.hash(password, 10);
        //10 es la cantidad de rondas que hace para encriptar el password

        //Guardar usuario en la base de datos
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);

    }catch(error){
        console.log(error);
    }

};