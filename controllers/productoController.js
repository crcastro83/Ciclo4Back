const producto = require("../models/producto");

exports.leerProductoHome = async (req, res) => {
    try {
        const producto1 = await producto.find();
        res.json({ producto1 });
    } catch (error) {
        console.log(error);
    }
}

exports.leerProducto = async (req, res) => {
    const { id } = req.params;
    const producto1 = await producto.find().where("categoriaId").equals(id);
    res.json(producto1);
    //console.log(error);
}

exports.leerProductoId = async (req, res) => {
    const {id} = req.params
    try{
        const producto1 = await producto.findById(id);
        res.json({producto1});
    }catch(error){
        console.log(error);
    }
}

exports.crearProducto = async (req, res) => {
    try {
        const producto1 = new producto(req.body);
        producto1.save();
        res.json(producto1);
    } catch (error) {
        console.log(error);
    }

}

exports.actualizarProducto = async (req, res) => {
    const {id} = req.params;

    const producto = await producto.findById(id);

    if(!producto){
        return res.status(400).json({msg : "Producto no encontrado"});
    }

    if(producto.creador.toString() !== req.usuario.id.toString()){
        return res.status(400).json({msg : "acción no valida para este usuario"});
    }

    producto.nombre = req.body.nombre || producto.nombre;
    producto.descripcion = req.body.descripcion || producto.descripcion;
    producto.stock = req.body.stock || producto.stock;
    producto.precio = req.body.precio || producto.precio;
    producto.imagen = req.body.imagen || producto.imagen;
    producto.save();
    res.json({producto});
}

exports.borrarProducto = async (req, res) => {
    try {
        await producto.deleteOne({ _id: req.params.id });
        res.json({ msg: "Producto eliminado" });
    } catch (error) {
        console.log(error);
        res.json({ msg: "Error al borrar Producto" });
    }
}