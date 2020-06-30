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

    newPago(fecha, nombreBanco, monto, tipoDocumento, nFactura, montoTotal){
        return new Promise(async function (resolve, reject){
            let reqStatus = await facturaServices.updateStatus(nFactura, monto, montoTotal);
            
            
            if(reqStatus === true){
                const query = `INSERT INTO pagos (Fecha, NombreBanco, Monto, IdTipoDocumentoPago, IdFactura) VALUES ('${fecha}','${nombreBanco}', '${monto}', '${tipoDocumento}', '${nFactura}');`;
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
}

module.exports = PagosService;