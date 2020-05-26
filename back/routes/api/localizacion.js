const express = require('express');
const router = express.Router();
const passport = require("passport");

const LocalizacionServices = require('../../services/localizacion');
const localizacionServices = new LocalizacionServices();


router.get("/", async function(req, res, next) {
    try {
        const datos = await localizacionServices.getAllRegiones().then(JSON);
        res.status(200).json({
            regiones: datos
        });
    } catch (error) {
        next(error);
    }
});

router.post("/:idRegion", async function(req, res, next) {
    try {
        const { idRegion } = req.params;
        const datos = await localizacionServices.getAllProvincias(idRegion).then(JSON);
        res.status(200).json({
            provincias: datos,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/comunas/:idProvincia", async function(req, res, next) {
    try {
        const { idProvincia } = req.params;
        const datos = await localizacionServices.getAllComunas(idProvincia).then(JSON);
        res.status(200).json({
            comunas: datos,
        });
    } catch (error) {
        next(error);
    }
});
module.exports = router;