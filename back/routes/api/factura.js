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

router.post("/:numeroFactura/:tasaIngreso/:fechaDocumento/:fechaVencimiento/:afecto/:excedente/:iva/:totalPagar/:idTipoFactura/:idTipoMoneda/:idTipoPago/:idCliente/:idVendedor", async function(req, res, next) {
    try {
        const { numeroFactura, tasaIngreso, fechaDocumento, fechaVencimiento, afecto, excedente, iva, totalPagar, idTipoFactura, idTipoMoneda, idTipoPago, idCliente, idVendedor } = req.params;
        
        const datos = await facturaServices.newFactura(numeroFactura, tasaIngreso, fechaDocumento, fechaVencimiento, afecto, excedente, iva, totalPagar, idTipoFactura, idTipoMoneda, idTipoPago, idCliente, idVendedor).then(JSON);
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