const { conn } = require('../lib/mariadb');


class ProductoService{
    getAllProducto(){
        return new Promise(function (resolve, reject){
            const query = "select * from producto";

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows)
            })
        });
    }

    newProducto(codigo, precio, detalle){
        return new Promise(function (resolve, reject){
            const query = `INSERT INTO producto (codigo, descripcion, precioUnitario) VALUES ('${codigo}', '${detalle}', '${precio}');`;
            console.log(query);
            conn.query(query, (err, rows) => {
                if(err){
                    return resolve(err);
                }else{
                    return resolve(true);
                }
            });
        });
    }

    newProductoCarga(codigo, detalle, precio){
        return new Promise(function (resolve, reject){
            const query = `INSERT INTO producto (codigo, descripcion, precioUnitario) VALUES ('${codigo}', '${detalle}', '${precio}');`;
            conn.query(query, (err, rows) => {
                if(err){
                    //console.log(err);
                    //return resolve(err);
                }else{
                    return resolve(true);
                }
            });
        });
    }
}

module.exports = ProductoService;