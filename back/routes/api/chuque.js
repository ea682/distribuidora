const express = require('express');
const router = express.Router();

const PagosServices = require('../../services/pagos');
const pagosServices = new PagosServices();
try {
    router.post("/:fecha/:nombreBanco/:hojaRuta/:monto/idFactura", async function(req, res, next) {
        try {
            console.log(56);
            const { fecha, nombreBanco, hojaRuta, monto, idFactura} = req.params;
            const datos = await pagosServices.newCheque(fecha, nombreBanco, hojaRuta, monto, idFactura).then(JSON);
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
} catch (error) {
    
}

module.exports = router;