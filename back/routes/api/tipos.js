const express = require('express');
const router = express.Router();

const TiposServices = require('../../services/tipos');
const tiposServices = new TiposServices();

router.get("/tipoCliente", async function(req, res, next) {
    try {
        const datos = await tiposServices.getAllTipoCliente().then(JSON);
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

router.get("/tipoFactura", async function(req, res, next) {
    try {
        const datos = await tiposServices.getAllTipoFactura().then(JSON);
        res.status(200).json({
            tipoFactura: datos,
        });
    } catch (error) {
        res.status(200).json({
            messaje: "Problemas para ingresar los datos",
        });
        console.log(error);
    }
});

router.get("/tipoMoneda", async function(req, res, next) {
    try {
        const datos = await tiposServices.getAllTipoMoneda().then(JSON);
        res.status(200).json({
            tipoMoneda: datos,
        });
    } catch (error) {
        res.status(200).json({
            messaje: "Problemas para ingresar los datos",
        });
        console.log(error);
    }
});

router.get("/tipoPago", async function(req, res, next) {
    try {
        const datos = await tiposServices.getAllTipoPago().then(JSON);
        res.status(200).json({
            tipoPago: datos,
        });
    } catch (error) {
        res.status(200).json({
            messaje: "Problemas para ingresar los datos",
        });
        console.log(error);
    }
});


module.exports = router;