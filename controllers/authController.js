const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({path : "variables.env"});

exports.autenticarUsuario = async (req, res) => {
    const {password, email} = req.body;

    try{
        //declarar usuario, para revisar que el correo este registrado
        let usuario = await Usuario.findOne({email});

        if (!usuario){
            return res.status(400).json({msg : "El usuario no existe"});
        }

        //validar el password
        const passwordCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passwordCorrecto){
            return res.status(404).json({msg : "password incorrecto"});
        }

        //si todo es correcto: crear y firmar token
        let payload ={
            usuario: {id : usuario.id},
        };
        //res.json(payload);
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: '30d', //1 dia expiración token
            },
            (error, token) => {
                if (error) throw error;
                //mensaje de confirmación
                res.json({token}); 
            }
        );

    }catch(error){
        console.log(error);
    }
}

exports.usuarioAutenticado = async (req, res) => {
    try{
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({usuario});
    }catch(error){
        res.status(403).json({msg : "hubo un error"});
    }
}