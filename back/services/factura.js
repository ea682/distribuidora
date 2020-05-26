const { conn } = require('../lib/mariadb');


class FacturaService{
    getAllFactura(){
        return new Promise(function (resolve, reject){
            const query = "select * from factura";

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows)
            })
        });
    }

    newFactura(numeroFactura, tasaIngreso, fechaDocumento, fechaVencimiento, afecto, excedente, iva, totalPagar, idTipoFactura, idTipoMoneda, idTipoPago, idCliente, idVendedor){
        return new Promise(function (resolve, reject){
            const query = `INSERT INTO factura (numeroFactura, tasaIngreso, fechaDocumento, fechaVencimiento, afecto, excedente, iva, totalPagar, idTipoFactura, idTipoMoneda, idTipoPago, idCliente, idVendedor) VALUES ('${numeroFactura}', '${tasaIngreso}', '${fechaDocumento}', '${fechaVencimiento}', '${afecto}', '${excedente}', '${iva}', '${totalPagar}', '${idTipoFactura}', '${idTipoMoneda}', '${idTipoPago}', '${idCliente}', '${idVendedor}');`;
            console.log(query);
            conn.query(query, (err, rows) => {
                if(err){
                    console.log(err);
                    return resolve(err);
                }else{
                    return resolve(true);
                }
            });
        });
    }
}

module.exports = FacturaService;