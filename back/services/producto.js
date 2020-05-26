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

    newProducto(nombre, precio){
        return new Promise(function (resolve, reject){
            const query = `INSERT INTO producto (nombreProducto, precioUnitario) VALUES ('${nombre}', '${precio}');`;
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

module.exports = ProductoService;