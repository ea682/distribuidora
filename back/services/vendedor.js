const { conn } = require('../lib/mariadb');


class VendedorService{
    getAllVendedor(){
        return new Promise(function (resolve, reject){
            const query = "select * from vendedor";

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows)
            })
        });
    }

    newVendedor(rut, nombre, direccion, comision, comuna){
        return new Promise(function (resolve, reject){
            const query = `INSERT INTO vendedor (rut, nombreVendedor, direccion, comision, idComuna) VALUES ('${rut}', '${nombre}', '${direccion}', '${comision}', '${comuna}');`;
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

module.exports = VendedorService;