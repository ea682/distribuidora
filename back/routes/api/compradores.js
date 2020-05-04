const express = require('express');
const router = express.Router();


const CompradoresServices = require('../../services/compradores');

const compradoresServices = new CompradoresServices();

router.post("/", async function(req, res, next) {
    try {
        const datos = await compradoresServices.getAll().then(JSON);
        res.status(200).json({
            compradores: datos,
            message: "compradrores listed"
        });
    } catch (error) {
        next(error);
    }
});



module.exports = router;