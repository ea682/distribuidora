const express = require('express');
const router = express.Router();

const ClientesServices = require('../../services/clientes');
const clientesServices = new ClientesServices();

router.get("/", async function(req, res, next) {
    try {
        const datos = await clientesServices.getAllClientes().then(JSON);
        res.status(200).json({
            clientes: datos,
        });
    } catch (error) {
        res.status(200).json({
            messaje: "Problemas para ingresar los datos",
        });
        console.log(error);
    }
});

router.get("/getTablaCliente", async function(req, res, next) {
    try {
        const datos = await clientesServices.getAllClientesTabla().then(JSON);
        res.status(200).json({
            clientes: datos,
        });
    } catch (error) {
        res.status(200).json({
            messaje: "Problemas para ingresar los datos",
        });
        console.log(error);
    }
});

router.post("/:rut/:nombreCliente/:direccion/:telefono/:giro/:comuna/:idVendedor", async function(req, res, next) {
    try {
        const { rut, nombreCliente, direccion, telefono, giro, comuna, idVendedor } = req.params;
        const datos = await clientesServices.newCliente(rut, nombreCliente, direccion, telefono, giro, comuna, idVendedor).then(JSON);
        //Validamos que la consulta este correcta
        if(datos === true){
            res.status(200).json({
                messaje: true,
            });
            console.log(true);
        }else{
            res.status(200).json({
                messaje: false,
            });
            console.log(false);
        }
    } catch (error) {
        res.status(200).json({
            messaje: "Problemas para ingresar los datos",
            
        });
        console.log(error);
    }
});
module.exports = router;