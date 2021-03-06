const { conn } = require('../lib/mariadb');


class ExportacionService{

    ventas(fechaInicio, fechaFinal){
        return new Promise(function (resolve, reject){
            const query = `SELECT fa.fechaDocumento,            
            fa.numeroFactura,            
            cli.nombreCliente,            
            ve.codigo,            
            cli.rut,
            tf.nombreTipoFactura,            
            CONCAT("$",Round((prof.preciounitario * proF.cantidad))) AS "totalNeto",            
            CONCAT("$",Round((prof.preciounitario * proF.cantidad)* CONCAT("0.", de.iva))) AS "IVA",            
            CONCAT("$",Round((prof.preciounitario * proF.cantidad)* CONCAT("1.", de.iva))) AS "total"               
            FROM factura AS fa               
            INNER JOIN detallefactura AS de                
            ON fa.id = de.idfactura                
            INNER JOIN productosfactura AS proF                
            ON proF.iddetallefacura = de.id                
            INNER JOIN tipofactura AS tf                
            ON fa.idtipofactura = tf.id               
            LEFT JOIN cliente AS cli
            ON cli.id = fa.idCliente               
            LEFT JOIN vendedor AS ve               
            ON ve.id = fa.idVendedor               
            WHERE fa.fechaDocumento BETWEEN  '${fechaInicio}' AND '${fechaFinal}' AND tf.id != 4
            ORDER  BY fa.fechaDocumento ASC`;
            conn.query(query, (err, rows) => {
                if(err){
                    return resolve(err);
                }else{
                    return resolve(rows);
                }
            });
        });
    }

    ventasProductosFecha(fechaInicio, fechaFinal){
        return new Promise(function (resolve, reject){
            const query = `SELECT fa.fechaDocumento,
            fa.numeroFactura,
            cli.nombreCliente,
            ve.codigo,
            cli.rut,
            tf.nombreTipoFactura,
            pro.descripcion AS "Producto",
            prof.cantidad,
            Round((prof.preciounitario * proF.cantidad)) AS "totalNeto",            
            Round((prof.preciounitario * proF.cantidad)* CONCAT("0.", de.iva)) AS "IVA",            
            Round((prof.preciounitario * proF.cantidad)* CONCAT("1.", de.iva)) AS "total"
            FROM factura AS fa
            INNER JOIN detallefactura AS de
            ON fa.id = de.idfactura
            INNER JOIN productosfactura AS proF
            ON proF.iddetallefacura = de.id
            INNER JOIN tipofactura AS tf
            ON fa.idtipofactura = tf.id
            LEFT JOIN cliente AS cli
            ON cli.id = fa.idCliente
            LEFT JOIN vendedor AS ve
            ON ve.id = fa.idVendedor
            INNER JOIN producto Pro on pro.id = proF.idProducto
            WHERE fa.fechaDocumento BETWEEN  '${fechaInicio}' AND '${fechaFinal}' AND tf.id != 4
            ORDER  BY fa.fechaDocumento ASC`;
            conn.query(query, (err, rows) => {
                if(err){
                    return resolve(err);
                }else{
                    return resolve(rows);
                }
            });
        });
    }

    ventasVendedorTotal(fechaInicio, fechaFinal, idVendedor){
        
        
        let arrayIdVendedor = idVendedor.split(',');
        //console.log(arrayIdVendedor.length);
        if(arrayIdVendedor.length === 1){
            idVendedor = `ve.id = '${idVendedor}'`
        }else{
            let idVendedor2 = "";
            for (let i = 0; i < arrayIdVendedor.length; i++) {
                //let dato = arrayIdVendedor[i].replace("'", "")
                if(arrayIdVendedor.length-1 === i){
                    idVendedor2 += ` ve.id = '${arrayIdVendedor[i]}'`
                }else{
                    idVendedor2 += ` ve.id = '${arrayIdVendedor[i]}' or `
                }
            }

            idVendedor = idVendedor2
        }

        console.log(idVendedor);
        return new Promise(function (resolve, reject){
            const query = `SELECT fa.fechaDocumento,
            fa.numeroFactura,
            cli.nombreCliente,
            ve.codigo,
            cli.rut,
            tf.nombreTipoFactura,
            pro.descripcion AS "Producto",
            prof.cantidad,
            Round((prof.preciounitario * proF.cantidad)) AS "totalNeto",            
            Round((prof.preciounitario * proF.cantidad)* CONCAT("0.", de.iva)) AS "IVA",            
            Round((prof.preciounitario * proF.cantidad)* CONCAT("1.", de.iva)) AS "total"
            FROM factura AS fa
            INNER JOIN detallefactura AS de
            ON fa.id = de.idfactura
            INNER JOIN productosfactura AS proF
            ON proF.iddetallefacura = de.id
            INNER JOIN tipofactura AS tf
            ON fa.idtipofactura = tf.id
            LEFT JOIN cliente AS cli
            ON cli.id = fa.idCliente
            LEFT JOIN vendedor AS ve
            ON ve.id = fa.idVendedor
            INNER JOIN producto Pro on pro.id = proF.idProducto
            WHERE fa.fechaDocumento BETWEEN  '${fechaInicio}' AND '${fechaFinal}' AND ${idVendedor} AND tf.id != 4
            ORDER  BY fa.fechaDocumento ASC`;
            //console.log(query);
            conn.query(query, (err, rows) => {
                if(err){
                    return resolve(err);
                }else{
                    return resolve(rows);
                }
            });
        });
    }
}

module.exports = ExportacionService;