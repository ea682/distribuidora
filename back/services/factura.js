const { conn } = require('../lib/mariadb');

//Servicio del cliente
const ClientesServices = require('./clientes');
const clientesServices = new ClientesServices();

const LogService = require('./log');
const logService = new LogService();

class FacturaService{

    getAllFactura(){
        return new Promise(function (resolve, reject){
            try {
                const query = "SELECT fa.id, de.id, de.facturaasociada, proF.id, cli.rut, cli.nombrecliente, cli.direccion, cli.giro, v.codigo AS 'rutVendedor', cli.telefono, tf.nombretipofactura, fa.numerofactura AS 'nFactura', fa.fechadocumento, pro.codigo, pro.descripcion, proF.cantidad, prof.preciounitario, CASE WHEN cantidad < 0 THEN Round( ( prof.preciounitario * proF.cantidad ) ) *-1 WHEN cantidad > 0 THEN Round( ( prof.preciounitario * proF.cantidad ) ) ELSE 'Fallo Interno' END AS 'totalUnitario', ( SELECT CASE WHEN sumP.cantidad < 0 THEN Round( Sum( ( ( sumP.cantidad * sumP.preciounitario ) ) * 1.19 ) -1 ) WHEN sumP.cantidad > 0 THEN Round( Sum( ( sumP.cantidad * sumP.preciounitario ) ) * 1.19 ) - ( SELECT CASE WHEN pa2.monto IS NOT NULL AND proF2.cantidad IS NOT NULL THEN pa2.monto + ROUND( SUM( proF2.cantidad * proF2.precioUnitario ) ) WHEN pa2.monto IS NULL AND proF2.cantidad IS NOT NULL THEN ROUND( SUM( proF2.cantidad * proF2.precioUnitario ) ) WHEN pa2.monto IS NULL AND proF2.cantidad IS NULL THEN 0 ELSE 0 END AS total FROM factura AS fa2 LEFT JOIN detalleFactura AS de2 ON fa2.id = de2.idFactura LEFT JOIN productosfactura AS proF2 ON proF2.idDetalleFacura = de2.id LEFT JOIN pagos AS pa2 ON fa2.id = pa2.idfactura WHERE de2.facturaAsociada = fa.numeroFactura ) ELSE 'Fallo' END AS 'Total' FROM productosfactura AS sumP LEFT JOIN detallefactura AS sumD ON sump.iddetallefacura = sumD.id RIGHT JOIN factura AS sumF ON sumD.idfactura = sumF.id WHERE sumF.numerofactura = fa.numerofactura ) AS 'totalBruto' FROM factura AS fa left JOIN detallefactura AS de ON fa.id = de.idfactura left JOIN productosfactura AS proF ON proF.iddetallefacura = de.id left JOIN tipofactura AS tf ON fa.idtipofactura = tf.id left JOIN tipopago AS tp ON fa.idtipopago = tp.id left JOIN cliente AS cli ON fa.idcliente = cli.id left JOIN vendedor AS v ON fa.idVendedor = v.id left JOIN statusfactura AS sf ON de.idstatusfactura = sf.id left JOIN producto AS pro ON proF.idproducto = pro.id ORDER BY fa.id ASC";

                conn.query(query, (err, rows) => {
                    if(err){
                        //console.log(err);
                        const queryError = `INSERT INTO log (nError, sqlMessage) VALUES ("${err.errno}", "${err.sqlMessage}")`;
                        conn.query(queryError, (err, rows) => {
                            if(err){
                                //console.log(err);
                            }else{
                            }
                        })
                    }else{
                        return resolve(rows)
                    }
                })
            } catch (err) {
                //console.log(err);
                const queryError = `INSERT INTO log (nError, sqlMessage) VALUES ("${err.errno}", "${err.sqlMessage}")`;
                conn.query(queryError, (err, rows) => {
                    if(err){
                    }else{
                    }
                })
            }
        });
    }

    getFactura(numeroCuenta){
        return new Promise(function (resolve, reject){
            try {
                const query = `SELECT fa.id, de.id, de.facturaasociada, proF.id, cli.rut, cli.nombrecliente, cli.direccion, cli.giro, v.codigo AS 'rutVendedor', cli.telefono, tf.nombretipofactura, fa.numerofactura AS 'nFactura', fa.fechadocumento, pro.codigo, pro.descripcion, proF.cantidad, prof.preciounitario, CASE WHEN cantidad < 0 THEN Round( ( prof.preciounitario * proF.cantidad ) ) *-1 WHEN cantidad > 0 THEN Round( ( prof.preciounitario * proF.cantidad ) ) ELSE 'Fallo Interno' END AS 'totalUnitario', ( SELECT CASE WHEN sumP.cantidad < 0 THEN Round( Sum( ( ( sumP.cantidad * sumP.preciounitario ) ) * 1.19 ) -1 ) WHEN sumP.cantidad > 0 THEN Round( Sum( ( sumP.cantidad * sumP.preciounitario ) ) * 1.19 ) - ( SELECT CASE WHEN pa2.monto IS NOT NULL AND proF2.cantidad IS NOT NULL THEN pa2.monto + ROUND( SUM( proF2.cantidad * proF2.precioUnitario ) ) WHEN pa2.monto IS NULL AND proF2.cantidad IS NOT NULL THEN ROUND( SUM( proF2.cantidad * proF2.precioUnitario ) ) WHEN pa2.monto IS NULL AND proF2.cantidad IS NULL THEN 0 ELSE 0 END AS total FROM factura AS fa2 LEFT JOIN detalleFactura AS de2 ON fa2.id = de2.idFactura LEFT JOIN productosfactura AS proF2 ON proF2.idDetalleFacura = de2.id LEFT JOIN pagos AS pa2 ON fa2.id = pa2.idfactura WHERE de2.facturaAsociada = fa.numeroFactura ) ELSE 'Fallo' END AS 'Total' FROM productosfactura AS sumP LEFT JOIN detallefactura AS sumD ON sump.iddetallefacura = sumD.id RIGHT JOIN factura AS sumF ON sumD.idfactura = sumF.id WHERE sumF.numerofactura = fa.numerofactura ) AS 'totalBruto' FROM factura AS fa left JOIN detallefactura AS de ON fa.id = de.idfactura left JOIN productosfactura AS proF ON proF.iddetallefacura = de.id left JOIN tipofactura AS tf ON fa.idtipofactura = tf.id left JOIN tipopago AS tp ON fa.idtipopago = tp.id left JOIN cliente AS cli ON fa.idcliente = cli.id left JOIN vendedor AS v ON fa.idVendedor = v.id left JOIN statusfactura AS sf ON de.idstatusfactura = sf.id left JOIN producto AS pro ON proF.idproducto = pro.id                WHERE fa.numeroFactura = ${numeroCuenta} ORDER  BY fa.id ASC`;

                conn.query(query, (err, rows) => {
                    if(err){
                        //console.log(err);
                        const queryError = `INSERT INTO log (nError, sqlMessage) VALUES ("${err.errno}", "${err.sqlMessage}")`;
                        conn.query(queryError, (err, rows) => {
                            if(err){
                                //console.log(err);
                            }else{
                            }
                        })
                    }else{
                        return resolve(rows)
                    }
                })
            } catch (err) {
                //console.log(err);
                const queryError = `INSERT INTO log (nError, sqlMessage) VALUES ("${err.errno}", "${err.sqlMessage}")`;
                conn.query(queryError, (err, rows) => {
                    if(err){
                    }else{
                    }
                })
            }
        });
    }

    newFactura(numeroFactura, fechaDocumento, fechaVencimiento, tipoFactura, tipoPago, cliente, iva, datos){
        try {
            return new Promise(function (resolve, reject){
                const query = `INSERT INTO factura (numeroFactura, fechaDocumento, fechaVencimiento, idTipoFactura, idTipoPago, idCliente) VALUES ('${numeroFactura}', '${fechaDocumento}', '${fechaVencimiento}', '${tipoFactura}', '${tipoPago}', '${cliente}');`;
    
                conn.query(query, (err, rows) => {
                    if(err){
                        if(err.errno == 1062){
                            return resolve("rep");
                        }else{
                            logService.newLog(err.errno, err.sqlMessage, err.sql);
                            return resolve(false);
                        }
                    }else{
                        let idFactura = rows.insertId;
                        datos = datos.split(',');
                        let contadorId = 0;
                        let contadorCantidad = 1;
                        let contadorprecio = 2;
    
                        for (let i = 0; i < datos.length/3; i++) {
                            let idProducto = datos[contadorId];
                            let cantidad = datos[contadorCantidad];
                            let precio = datos[contadorprecio].replace('$','');
                            const query = `INSERT INTO detalleFactura (iva, idFactura, idStatusFactura) VALUES ('${iva}', '${idFactura}', '3');`;
    
                            conn.query(query, (err, rowsDetalle) => {
                                if(err){
                                    //console.log(err);
                                    const queryError = `INSERT INTO log (nError, sqlMessage, sqlm) VALUES ("${err.errno}", "${err.sqlMessage}", "${err.sql}")`;
                                    conn.query(queryError, (err, rows) => {
                                        if(err){
                                            logService.newLog(err.errno, err.sqlMessage, err.sql);
                                        }else{
                                        }
                                    })
                                    return resolve(false);
                                }else{
                                    let idDetalle = rowsDetalle.insertId;
                                    const query = `INSERT INTO productosFactura (cantidad, precioUnitario, idProducto, idDetalleFacura) VALUES ('${cantidad}', '${precio}', '${idProducto}', '${idDetalle}');`
                                    conn.query(query, (err, rowsDetalle) => {
                                        if(err){
                                            logService.newLog(err.errno, err.sqlMessage, err.sql);
                                            return resolve(false);
                                        }else{
                                            return resolve(true);
                                        }
                                    })
                                }
                            })
                            contadorId = contadorId + 3;
                            contadorCantidad = contadorCantidad + 3;
                            contadorprecio = contadorprecio +3;
                        }
                    }
                });
            });
        } catch (error) {
            const queryError = `INSERT INTO log (nError, sqlMessage, sqlm) VALUES ("${err.errno}", "${err.sqlMessage}", "${err.sql}")`;
            conn.query(queryError, (err, rows) => {
                if(err){
                    logService.newLog(err.errno, err.sqlMessage, err.sql);
                }else{
                }
            })
            return resolve(false);
        }
    }

    newFacturaCarga(tipoFactura, numeroFactura, fechaDocumento, fechaVencimiento, rutCliente, cantidad, precioUni, codigoProducto, facturaAsociada, codigoVendedor){

        let idVendedor = "";
        const queryError = `SELECT id FROM vendedor WHERE codigo = "${codigoVendedor}";`;
        conn.query(queryError, (err, rows) => {
            if(err){
                logService.newLog(err.errno, err.sqlMessage, err.sql);
            }else{
                idVendedor = rows[0].id;
            }
        })

        

        tipoFactura = tipoFactura.split(' ')[0];
        let idTipoFactura = '';
        let idCliente = '';
        let idFactura = '';
        let idCodigoProducto = '';
        //Obtenemos el id
        const query = `SELECT id FROM tipofactura WHERE codigo = ${tipoFactura}`;
        //Realizamos la consulta y recorremos los datos.
        conn.query(query, (err,rowsTipoFactura) => {
            if(err){
                logService.newLog(err.errno, err.sqlMessage, err.sql);
            }else{
                //Obtenemos el id.
                //console.log(tipoFactura);
                //console.log(numeroFactura);
                try {
                    idTipoFactura = rowsTipoFactura[0].id
                //Obtenemos el id del cliente
                const query = `SELECT id FROM cliente WHERE rut = '${rutCliente}'`;
                //Realizamos la consulta y recorremos los datos.
                conn.query(query, (err,rowsCliente) => {
                    if(err){
                        logService.newLog(err.errno, err.sqlMessage, err.sql);
                    }else{
                        if(rowsCliente[0] === "[]" || rowsCliente[0] === undefined)
                        {
                            //console.log(rutCliente);
                        }else{
                            idCliente = rowsCliente[0].id
                            //Las fechas estan numericas, las coonverimos nuevamente a fechas.
                            try {
                                fechaDocumento = this.numeroAFecha(fechaDocumento, true);
                            } catch (error) {
                                let arrayFechaDocumento = fechaDocumento.split('/');
                                fechaDocumento = `${arrayFechaDocumento[2]}-${arrayFechaDocumento[1]}-${arrayFechaDocumento[0]}`;
                            }
                            

                            //En caso que no venga la fecha, le asignamos la del documento
                            try {
                                fechaVencimiento = this.numeroAFecha(fechaVencimiento, true);
                            } catch (error) {
                                let arrayFechaV = fechaVencimiento.split('/');
                                fechaVencimiento = `${arrayFechaV[2]}-${arrayFechaV[1]}-${arrayFechaV[0]}`;
                            }
                            

                            const query = `INSERT INTO factura (numeroFactura, fechaDocumento, fechaVencimiento, idTipoFactura, idCliente, idTipoPago, idVendedor) VALUES ('${numeroFactura}', '${fechaDocumento}', '${fechaVencimiento}', '${idTipoFactura}', '${idCliente}', 1, '${idVendedor}');`;

                            conn.query(query, (err, rowsFactura) => {
                                if(err){
                                    logService.newLog(err.errno, err.sqlMessage, err.sql);
                                }else{

                                }
                            });

                            //Obtenemos el id de la factura
                            const queryGetIdFactura = `SELECT id FROM factura WHERE numeroFactura = '${numeroFactura}'`;

                            conn.query(queryGetIdFactura, (err, rowsFactura) => {
                                if(err){
                                }else{
                                    //console.log(queryGetIdFactura);
                                    idFactura = rowsFactura[0].id;
                                    let queryInsertDetalleFactura = "";
                                    if(facturaAsociada > 1){
                                        //Agregamos los detalles de la factua
                                        queryInsertDetalleFactura = `INSERT INTO detallefactura (iva, idFactura, idStatusFactura, facturaAsociada) VALUES (19, ${idFactura}, 3, ${facturaAsociada})`;
                                    }else{
                                        //Agregamos los detalles de la factua
                                        queryInsertDetalleFactura = `INSERT INTO detallefactura (iva, idFactura, idStatusFactura) VALUES (19, ${idFactura}, 3)`;

                                    }
                                    conn.query(queryInsertDetalleFactura, (err, rowsFactura) => {
                                        if(err){
                                            logService.newLog(err.errno, err.sqlMessage, err.sql);
                                        }else{
                                            //Obtenemos el id de la insercion.
                                            let idInsert = rowsFactura.insertId;

                                            const queryIdProducto = `SELECT id FROM producto WHERE codigo = '${codigoProducto}'`;

                                            conn.query(queryIdProducto, (err, rowsFactura) => {
                                                if(err){
                                                    //console.log(err);
                                                    //console.log(queryIdProducto);
                                                    logService.newLog(err.errno, err.sqlMessage, err.sql);
                                                }else{
                                                    
                                                    try {
                                                        idCodigoProducto = rowsFactura[0].id;
                                                    } catch (error) {
                                                        //console.log(error);
                                                        //console.log(queryIdProducto);
                                                    }
                                                    
                                                    //Agregamos los detalles de la factua
                                                    const queryInsertProduto = `INSERT INTO productosfactura (cantidad, precioUnitario, idProducto, idDetalleFacura) VALUES ('${cantidad}', '${precioUni}','${idCodigoProducto}','${idInsert}')`;

                                                    conn.query(queryInsertProduto, (err, rowsFactura) => {
                                                        if(err){
                                                            logService.newLog(err.errno, err.sqlMessage, err.sql);
                                                            //console.log(err);
                                                            //console.log(queryInsertProduto);
                                                        }else{
                                                            return true;
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        } 
                    }
                    
                });
                } catch (error) {
                    
                }
            }
        });
    }

    numeroAFecha(numeroDeDias, esExcel = false) {
        let diasDesde1900 = esExcel ? 25567 + 1 : 25567;
        let numeroDeDias2 = numeroDeDias;
        //console.log(Date.now());
        //console.log("------------------------------------------------------------------");
        // 86400 es el número de segundos en un día, luego multiplicamos por 1000 para obtener milisegundos.
        //console.log(new Date((numeroDeDias - diasDesde1900) * 86400 * 1000).toISOString().slice(0,10));
        let newFecha =  new Date((numeroDeDias - diasDesde1900) * 86400 * 1000).toISOString().slice(0,10);
        return newFecha;
    }

    updateStatus(idFactura, monto, montoTotal){
        let idStatus = this.validarStatus(monto, montoTotal);
        return new Promise(function (resolve, reject){
            //Buscamos el codigo del vendedor
            
            //console.log("idStatus  "+idStatus);
            if(idStatus != false){
                const query = `UPDATE detalleFactura SET idStatusFactura = '${idStatus}' where idFactura = ${idFactura}`;
                conn.query(query, (err, rows) => {
                    if(err){
                        return resolve(false);
                    }else{
                        return resolve(true);
                    }
                });
            }else{
                return resolve(false);
            }
        });
    }

    //Validamos el estatus de la factura
    validarStatus(monto, montoBruto){
        console.log(`Monto : ${monto}   total : ${montoBruto}`);
        //Validamos que es un error
        if(parseInt(monto) <= 0 || parseInt(monto) > parseInt(montoBruto)){
            return false;
        }else{
            //Esta abonado
            if(monto < montoBruto){
                return 2;
            }else{
                //La factura esta pagada.
                return 1;
            }
        }
    }
}

module.exports = FacturaService;
