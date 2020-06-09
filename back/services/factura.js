const { conn } = require('../lib/mariadb');
const DetalleFacturaService = require('./detalleFactura');
const detalleFacturaService = new DetalleFacturaService();

class FacturaService{
    getAllFactura(){
        return new Promise(function (resolve, reject){
            const query = "SELECT fa.id, de.id, proF.id, cli.rut, cli.nombreCliente, cli.direccion, cli.giro, v.rut as 'rutVendedor', cli.telefono,tf.nombreTipoFactura, fa.numeroFactura as 'nFactura', fa.fechaDocumento, pro.codigo, pro.descripcion, proF.cantidad, pro.precioUnitario, (pro.precioUnitario*proF.cantidad) AS 'totalUnitario', ((pro.precioUnitario*proF.cantidad)* CONCAT('1.',de.iva)) AS 'totalNeto'					FROM factura AS fa 					INNER JOIN detalleFactura AS de 					ON fa.id = de.idFactura					INNER JOIN productosfactura AS proF	ON proF.idDetalleFacura = de.id	INNER JOIN tipofactura AS tf					ON fa.idTipoFactura = tf.id					INNER JOIN tipopago AS tp					ON fa.idTipoPago = tp.id					INNER JOIN cliente AS cli					ON fa.idCliente = cli.id					INNER JOIN vendedor AS v					ON cli.idVendedor = v.id					INNER JOIN statusfactura AS sf					ON de.idStatusFactura = sf.id					INNER JOIN producto AS pro					ON proF.idProducto = pro.id";

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows)
            })
        });
    }

    newFactura(numeroFactura, fechaDocumento, fechaVencimiento, tipoFactura, tipoPago, cliente, iva, detalle, datos){
        return new Promise(function (resolve, reject){
            const query = `INSERT INTO factura (numeroFactura, fechaDocumento, fechaVencimiento, idTipoFactura, idTipoPago, idCliente) VALUES ('${numeroFactura}', '${fechaDocumento}', '${fechaVencimiento}', '${tipoFactura}', '${tipoPago}', '${cliente}');`;

            conn.query(query, (err, rows) => {
                if(err){
                    console.log(err);
                    return resolve(err);
                }else{
                    let idFactura = rows.insertId;
                    datos = datos.split(',');
                    let contadorId = 0;
                    let contadorCantidad = 1;

                    for (let i = 0; i < datos.length/2; i++) {
                        let idProducto = datos[contadorId];
                        let cantidad = datos[contadorCantidad];
                        const query = `INSERT INTO detalleFactura (detalle, iva, idFactura, idStatusFactura) VALUES ('${detalle}', '${iva}', '${idFactura}', '3');`;

                        conn.query(query, (err, rowsDetalle) => {
                            if(err){
                                console.log(err);
                                return resolve(err);
                            }else{
                                let idDetalle = rowsDetalle.insertId;
                                const query = `INSERT INTO productosFactura (cantidad, idProducto, idDetalleFacura) VALUES ('${cantidad}', '${idProducto}', '${idDetalle}');`
                                conn.query(query, (err, rowsDetalle) => {
                                    if(err){
                                        console.log(err);
                                        return resolve(err);
                                    }else{
                                        return resolve(true);
                                    }
                                })
                            }
                        })
                        console.log(query);
                        contadorId = contadorId + 2;
                        contadorCantidad = contadorCantidad + 2;
                    }
                    
                    return resolve(true);
                }
            });
        });
    }
}

module.exports = FacturaService;