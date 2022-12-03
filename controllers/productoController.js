const Producto = require("../models/producto");

exports.leerProducto = async (req, res) => {
    try{
        const producto = await Producto.find({creador: req.usuario.id});
        res.json({producto});
    }catch(error){
        console.log(error);
    }
}

exports.crearProducto = async (req, res) => {
    try{
        const producto = new Producto(req.body);

        producto.creador = req.usuario.id;

        producto.save();

        res.json(producto);
    }catch(error){
        console.log(error);
    }

}

exports.actualizarProducto = async (req, res) => {
    const {id} = req.params;

    const producto = await Producto.findById(id);

    if(!producto){
        return res.status(400).json({msg : "producto no encontrada"});
    }

    if(producto.creador.toString() !== req.usuario.id.toString()){
        return res.status(400).json({msg : "acción no valida para este producto"});
    }

    producto.nombre = req.body.nombre || producto.nombre;

    producto.save();
    res.json({producto});

}

exports.borrarProducto = async (req, res) => {
    try{
        await Producto.deleteOne({_id: req.params.id});
        res.json({msg: "Producto eliminado"});
    }catch(error){
        console.log(error);
    }

}