const express = require('express');
const router = express.Router();

const ProductoServices = require('../../services/producto');
const productoServices = new ProductoServices();

router.get("/", async function(req, res, next) {
    try {
        const datos = await productoServices.getAllProducto().then(JSON);
        res.status(200).json({
            producto: datos,
        });
    } catch (error) {
        res.status(200).json({
            messaje: "Problemas para ingresar los datos",
        });
        console.log(error);
    }
});

router.post("/:codigo/:nombre/:precio/:detalle", async function(req, res, next) {
    try {
        const { codigo, nombre, precio, detalle } = req.params;
        const datos = await productoServices.newProducto(codigo, nombre, precio, detalle).then(JSON);
        //Validamos que la consulta este correcta
        if(datos === true){
            res.status(200).json({
                messaje: true,
            });
        }else{
            res.status(200).json({
                messaje: false,
            });
        }
    } catch (error) {
        res.status(200).json({
            messaje: "Problemas para ingresar los datos",
        });
        console.log(error);
    }
});
module.exports = router;