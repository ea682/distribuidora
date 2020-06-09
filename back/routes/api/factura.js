const express = require('express');
const router = express.Router();

const FacturaServices = require('../../services/factura');
const facturaServices = new FacturaServices();

router.get("/", async function(req, res, next) {
    try {
        const datos = await facturaServices.getAllFactura().then(JSON);
        res.status(200).json({
            factura: datos,
        });
    } catch (error) {
        res.status(200).json({
            messaje: "Problemas para ingresar los datos",
        });
        console.log(error);
    }
});

router.post("/:numeroFactura/:detalle/:tipoFactura/:tipoPago/:fechaDocumento/:fechaVencimiento/:cliente/:datos/:iva", async function(req, res, next) {
    try {
        const { numeroFactura, detalle, tipoFactura, tipoPago, fechaDocumento, fechaVencimiento, cliente, datos, iva } = req.params;
        
        const datosFactura = await facturaServices.newFactura(numeroFactura, fechaDocumento, fechaVencimiento, tipoFactura, tipoPago, cliente, iva, detalle, datos).then(JSON);
        //Validamos que la consulta este correcta
        if(datosFactura === true){
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