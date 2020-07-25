const express = require('express');
const router = express.Router();

const VendedorServices = require('../../services/vendedor');
const vendedorServices = new VendedorServices();

router.get("/", async function(req, res, next) {
    try {
        const datos = await vendedorServices.getAllVendedor().then(JSON);
        res.status(200).json({
            vendedores: datos,
        });
    } catch (error) {
        res.status(200).json({
            messaje: "Problemas para ingresar los datos",
        });
        console.log(error);
    }
});

router.post("/:rut/:nombre/:direccion/:comision/:comuna", async function(req, res, next) {
    try {
        const { rut, nombre, direccion, comision, comuna } = req.params;
        const datos = await vendedorServices.newVendedor(rut, nombre, direccion, comision, comuna).then(JSON);
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