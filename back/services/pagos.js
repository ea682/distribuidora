const { conn } = require('../lib/mariadb');


const FacturaServices = require('./factura');
const facturaServices = new FacturaServices();


class PagosService{
    getAllPagos(){
        return new Promise(function (resolve, reject){
            const query = "select * from pagos";

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows)
            })
        });
    }

    newPago(fecha, monto, nFactura, montoTotal){
        return new Promise(async function (resolve, reject){
            let reqStatus = await facturaServices.updateStatus(nFactura, monto, montoTotal);
            
            
            if(reqStatus === true){
                const query = `INSERT INTO pagos (Fecha, Monto, IdTipoDocumentoPago, IdFactura) VALUES ('${fecha}', '${monto}', '1', '${nFactura}');`;
               // console.log("query "+query);
                conn.query(query, (err, rows) => {
                    if(err){
                        console.log(err);
                        return resolve(err);
                    }else{
                        return resolve(true);
                    }
                });
            }else{
                
                return resolve(false);
            }
            
        });
    }

    newCheque(fecha, nombreBanco, hojaRuta, monto, idFactura){
        return new Promise(async function (resolve, reject){
            const query = `INSERT INTO cheques (fecha, banco, hojaRuta, monto, idCodigoFactura) VALUES ('${fecha}','${nombreBanco}','${hojaRuta}', '${monto}', '${idFactura}');`;
            console.log("query "+query);
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

module.exports = PagosService;