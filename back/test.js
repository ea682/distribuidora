const express = require('express');
const bcrypt = require("bcrypt");
const { config } = require('./config/index');
const router = express.Router();

async function encriptarClave() {
    
    const hashedPassword = await bcrypt.hash(config.authAdminPassword, 10);
    console.log(hashedPassword);
    return hashedPassword;
}

router.post("/", async function(req, res, next) {
    try {
        const datos = encriptarClave()
        res.status(200).json({
            Users: datos,
            message: "Users listed"
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;