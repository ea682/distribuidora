const express = require('express');
const router = express.Router();


const UsersServices = require('../../services/users');

const usersServices = new UsersServices();

router.post("/", async function(req, res, next) {
    try {
        const datos = await usersServices.getAllUsers().then(JSON);
        res.status(200).json({
            Users: datos,
            message: "Users listed"
        });
    } catch (error) {
        next(error);
    }
});

router.get("/:email", async function(req, res, next) {
    try {
        const { email } = req.params;
        const datos = await usersServices.getUser(email).then(JSON);
        res.status(200).json({
            User: datos,
            message: "Datos User"
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;