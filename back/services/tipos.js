const { conn } = require('../lib/mariadb');


class TiposService{
    getAllTipoCliente(){
        return new Promise(function (resolve, reject){
            const query = "select * from tipocliente";

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows)
            })
        });
    }

    getAllTipoFactura(){
        return new Promise(function (resolve, reject){
            const query = "select * from tipofactura";

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows)
            })
        });
    }
    getAllTipoMoneda(){
        return new Promise(function (resolve, reject){
            const query = "select * from tipomoneda";

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows)
            })
        });
    }
    getAllTipoPago(){
        return new Promise(function (resolve, reject){
            const query = "select * from tipopago";

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows)
            })
        });
    }
}

module.exports = TiposService;