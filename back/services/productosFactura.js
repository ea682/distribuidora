const { conn } = require('../lib/mariadb');


class ProductosFacturaService{

    newProductosFactura(idProducto, idDetalleFacura){
        return new Promise(function (resolve, reject){
            const query = `INSERT INTO productosfactura (idProducto, idDetalleFacura) VALUES ('${idProducto}', '${idDetalleFacura}');`;
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

module.exports = ProductosFacturaService;