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
module.exports = router;