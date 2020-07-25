const { conn } = require('../lib/mariadb');


class DetalleFacturaService{

    newDetalleFactura(detalle, cantidad, iva, idFactura, idStatusFactua){
        return new Promise(function (resolve, reject){
            const query = `INSERT INTO detallefactura (detalle, cantidad, iva, idFactura, idStatusFactua) VALUES ('${detalle}', '${cantidad}', '${iva}', '${idFactura}', '${idStatusFactua}');`;
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

module.exports = DetalleFacturaService;