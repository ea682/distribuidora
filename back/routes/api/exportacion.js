const express = require('express');
const router = express.Router();

const ExportacionService = require('../../services/exportacion');
const exportacionService = new ExportacionService();

router.post("/ventas/:inicio/:final", async function(req, res, next) {
    try {
        const { inicio, final } = req.params;
        const datos = await exportacionService.ventas(inicio, final).then(JSON);
        res.status(200).json({
            ventas: datos,
        });
    } catch (error) {
        res.status(200).json({
            messaje: "Problemas para ingresar los datos",
        });
    }
});

router.post("/ventasProductosFecha/:inicio/:final", async function(req, res, next) {
    try {
        console.log("ventasProductosFecha");
        const { inicio, final } = req.params;
        const datos = await exportacionService.ventasProductosFecha(inicio, final).then(JSON);
        res.status(200).json({
            ventas: datos,
        });
    } catch (error) {
        res.status(200).json({
            messaje: "Problemas para ingresar los datos",
        });
    }
});

router.post("/ventasVendedorTotal/:inicio/:final/:idVendedor", async function(req, res, next) {
    try {
        
        const { inicio, final, idVendedor } = req.params;
        const datos = await exportacionService.ventasVendedorTotal(inicio, final, idVendedor).then(JSON);
        res.status(200).json({
            ventas: datos,
        });
    } catch (error) {
        res.status(200).json({
            messaje: "Problemas para ingresar los datos",
        });
    }
});
module.exports = router;