const { conn } = require('../lib/mariadb');

//Servicio del cliente
const ClientesServices = require('./clientes');
const clientesServices = new ClientesServices();

class FacturaService{

    getAllFactura(){
        return new Promise(function (resolve, reject){
            try {
                const query = "SELECT                                fa.id,                                de.id,  	                de.facturaAsociada,                              proF.id,                                cli.rut,                                cli.nombreCliente,                                cli.direccion,                                cli.giro,                                v.codigo as 'rutVendedor',                               cli.telefono,                                tf.nombreTipoFactura,                                fa.numeroFactura as 'nFactura',                                fa.fechaDocumento,                pro.codigo,                                pro.descripcion,                                proF.cantidad,                                prof.precioUnitario,                                CASE                                        WHEN cantidad < 0 THEN ROUND((prof.precioUnitario*proF.cantidad))*-1                                      WHEN cantidad > 0 THEN ROUND((prof.precioUnitario*proF.cantidad))                                        ELSE 'Fallo Interno'                                        END AS 'totalUnitario',                                    (                                         SELECT                                 CASE                                                             WHEN sumP.cantidad < 0 THEN ROUND(SUM(((sumP.cantidad * sumP.precioUnitario))*1.19)-1)                                                             WHEN sumP.cantidad > 0 THEN ROUND(SUM((sumP.cantidad * sumP.precioUnitario))*1.19)- (SELECT case                                    when pa.monto IS not NULL then SUM(pa.monto)                                     ELSE 0                                    END AS total123                                    FROM pagos AS pa                                    INNER JOIN  factura AS f ON f.id = pa.IdFactura                                    WHERE F.id = fa.id)                                    ELSE 'Fallo'                                                             END AS 'Total'                                                         FROM productosfactura AS sumP                                                         INNER JOIN detalleFactura AS sumD                                                         ON sump.idDetalleFacura = sumD.id                                                         INNER JOIN factura AS sumF                                                         ON sumD.idFactura = sumF.id                                                         WHERE sumF.numeroFactura = fa.numeroFactura                                        ) AS 'totalBruto'                                 FROM factura AS fa                                     INNER JOIN detalleFactura AS de                                        ON fa.id = de.idFactura                                     INNER JOIN productosfactura AS proF                                        ON proF.idDetalleFacura = de.id                                    INNER JOIN tipofactura AS tf                                       ON fa.idTipoFactura = tf.id                                     INNER JOIN  tipopago AS tp                                        ON fa.idTipoPago = tp.id                                     INNER JOIN  cliente AS cli                                        ON fa.idCliente = cli.id                                     INNER JOIN vendedor AS v                                        ON cli.idVendedor = v.id                                     INNER JOIN statusfactura AS sf                                        ON de.idStatusFactura = sf.id                                     INNER JOIN  producto AS pro                                        ON proF.idProducto = pro.id                    ORDER BY fa.id ASC";

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

    getFactura(numeroFactura){
        return new Promise(function (resolve, reject){
            try {
                const query = `SELECT                                
                fa.id AS idFactura,
                fa.numeroFactura,                               
                de.id,  	                
                de.facturaAsociada,                              
                proF.id,                                
                cli.rut,                                
                cli.nombreCliente,                                
                cli.direccion,                                
                cli.giro,                                
                v.codigo as 'rutVendedor',                               
                cli.telefono,                                
                tf.nombreTipoFactura,                                
                fa.numeroFactura as 'nFactura',                                
                fa.fechaDocumento,                
                pro.codigo,                                
                pro.descripcion,                                
                proF.cantidad,                                
                prof.precioUnitario,                                
                    CASE                                        
                        WHEN cantidad < 0 THEN ROUND((prof.precioUnitario*proF.cantidad))*-1                                      
                        WHEN cantidad > 0 THEN ROUND((prof.precioUnitario*proF.cantidad))                                        
                        ELSE 'Fallo Interno'                                        
                        END AS 'totalUnitario',                                    
                        ( 
                            SELECT                                 
                                CASE                                                             
                                    WHEN sumP.cantidad < 0 THEN ROUND(SUM(((sumP.cantidad * sumP.precioUnitario))*1.19)-1)                                    WHEN sumP.cantidad > 0 THEN ROUND(SUM((sumP.cantidad * sumP.precioUnitario))*1.19)- (SELECT case                                    
                            when pa.monto IS not NULL then SUM(pa.monto)                                     
                            ELSE 0                                    
                            END AS total123                                    
                            FROM pagos AS pa                                    
                            INNER JOIN  factura AS f 
                            ON f.id = pa.IdFactura                                    
                            WHERE F.id = fa.id AND pa.IdTipoDocumentoPago = 1)                                    ELSE 'Fallo'                                                             END AS 'Total'                                                         FROM productosfactura AS sumP                                                         INNER JOIN detalleFactura AS sumD                                                         ON sump.idDetalleFacura = sumD.id                                                         INNER JOIN factura AS sumF                                                         ON sumD.idFactura = sumF.id                                                         WHERE sumF.numeroFactura = fa.numeroFactura                                        ) AS 'totalBruto'                                 FROM factura AS fa                                     INNER JOIN detalleFactura AS de                                        ON fa.id = de.idFactura                                     INNER JOIN productosfactura AS proF                                        ON proF.idDetalleFacura = de.id                                    INNER JOIN tipofactura AS tf                                       ON fa.idTipoFactura = tf.id                                     INNER JOIN  tipopago AS tp                                        ON fa.idTipoPago = tp.id                                     INNER JOIN  cliente AS cli                                        ON fa.idCliente = cli.id                                     INNER JOIN vendedor AS v                                        ON cli.idVendedor = v.id                                     INNER JOIN statusfactura AS sf                                        ON de.idStatusFactura = sf.id                                     INNER JOIN  producto AS pro                                        
            ON proF.idProducto = pro.id   
            WHERE fa.numeroFactura like '%${numeroFactura}%'`;

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
                            //console.log(err);
                            const queryError = `INSERT INTO log (nError, sqlMessage, sqlm) VALUES ("${err.errno}", "${err.sqlMessage}", "${err.sql}")`;
                            conn.query(queryError, (err, rows) => {
                                if(err){
                                }else{
                                }
                            })
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
                                        }else{
                                        }
                                    })
                                    return resolve(false);
                                }else{
                                    let idDetalle = rowsDetalle.insertId;
                                    const query = `INSERT INTO productosFactura (cantidad, precioUnitario, idProducto, idDetalleFacura) VALUES ('${cantidad}', '${precio}', '${idProducto}', '${idDetalle}');`
                                    conn.query(query, (err, rowsDetalle) => {
                                        if(err){
                                            //console.log(err);
                                            const queryError = `INSERT INTO log (nError, sqlMessage, sqlm) VALUES ("${err.errno}", "${err.sqlMessage}", "${err.sql}")`;
                                            conn.query(queryError, (err, rows) => {
                                                if(err){
                                                }else{
                                                }
                                            })
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
                }else{
                }
            })
            return resolve(false);
        }
    }

    newFacturaCarga(tipoFactura, numeroFactura, fechaDocumento, fechaVencimiento, rutCliente, cantidad, precioUni, codigoProducto, facturaAsociada){
        //Obtenemos el codigo del tipo de pago
        //console.log(tipoFactura);
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
                //console.log(err);
            }else{
                //Obtenemos el id.
                idTipoFactura = rowsTipoFactura[0].id
                //Obtenemos el id del cliente
                const query = `SELECT id FROM cliente WHERE rut = '${rutCliente}'`;
                //Realizamos la consulta y recorremos los datos.
                conn.query(query, (err,rowsCliente) => {
                    if(err){
                        //console.log(err);
                    }else{
                        if(rowsCliente[0] === "[]" || rowsCliente[0] === undefined)
                        {
                            //console.log(rutCliente);
                        }else{
                            idCliente = rowsCliente[0].id
                            //Las fechas estan numericas, las coonverimos nuevamente a fechas.
                            fechaDocumento = this.numeroAFecha(fechaDocumento, true);

                            //En caso que no venga la fecha, le asignamos la del documento
                            try {
                                fechaVencimiento = this.numeroAFecha(fechaVencimiento, true);
                            } catch (error) {
                                fechaVencimiento = fechaDocumento;
                            }
                            

                            const query = `INSERT INTO factura (numeroFactura, fechaDocumento, fechaVencimiento, idTipoFactura, idCliente, idTipoPago) VALUES ('${numeroFactura}', '${fechaDocumento}', '${fechaVencimiento}', '${idTipoFactura}', '${idCliente}', 1);`;

                            conn.query(query, (err, rowsFactura) => {
                                if(err){
                                    //console.log(err);
                                }else{

                                }
                            });

                            //Obtenemos el id de la factura
                            const queryGetIdFactura = `SELECT id FROM factura WHERE numeroFactura = '${numeroFactura}'`;

                            conn.query(queryGetIdFactura, (err, rowsFactura) => {
                                if(err){
                                }else{
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
                                            console.log(err);
                                        }else{
                                            //Obtenemos el id de la insercion.
                                            let idInsert = rowsFactura.insertId;

                                            const queryIdProducto = `SELECT id FROM producto WHERE codigo = '${codigoProducto}'`;

                                            conn.query(queryIdProducto, (err, rowsFactura) => {
                                                if(err){
                                                }else{
                                                    idCodigoProducto = rowsFactura[0].id;
                                                    //Agregamos los detalles de la factua
                                                    const queryInsertProduto = `INSERT INTO productosfactura (cantidad, precioUnitario, idProducto, idDetalleFacura) VALUES ('${cantidad}', '${precioUni}','${idCodigoProducto}','${idInsert}')`;

                                                    conn.query(queryInsertProduto, (err, rowsFactura) => {
                                                        if(err){
                                                            //console.log(err);
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
        if(monto <= 0 || monto > montoBruto){
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
