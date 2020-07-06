const express = require('express');
const router = express.Router();

const PagosServices = require('../../services/pagos');
const pagosServices = new PagosServices();


router.get("/", async function(req, res, next) {
    try {
        const datos = await pagosServices.getAllPagos().then(JSON);
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

router.post("/:fecha/:nombreBanco/:monto/:tipoDocumento/:nFactura/:montoTotal", async function(req, res, next) {
    try {
        console.log(56);
        const { fecha, nombreBanco, monto, tipoDocumento, nFactura, montoTotal } = req.params;
        const datos = await pagosServices.newPago(fecha, nombreBanco, monto, tipoDocumento, nFactura, montoTotal).then(JSON);
        //Validamos que la consulta este correcta
        console.log("datos "+datos);
        if(datos === true){
            res.status(200).json({
                messaje: datos,
            });
        }else{
            res.status(200).json({
                messaje: datos,
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