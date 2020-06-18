const { conn } = require('../lib/mariadb');

//Servicio del cliente
const ClientesServices = require('./clientes');
const clientesServices = new ClientesServices();

class FacturaService{

    getAllFactura(){
        return new Promise(function (resolve, reject){
            try {
                const query = "SELECT fa.id, de.id, proF.id, cli.rut, cli.nombreCliente, cli.direccion, cli.giro, v.codigo as 'rutVendedor', cli.telefono,tf.nombreTipoFactura, fa.numeroFactura as 'nFactura', fa.fechaDocumento, pro.codigo, pro.descripcion, proF.cantidad, prof.precioUnitario, (prof.precioUnitario*proF.cantidad) AS 'totalUnitario', FORMAT(((proF.precioUnitario*proF.cantidad)* CONCAT('1.',de.iva)), 3) AS 'totalNeto'											FROM factura AS fa 					INNER JOIN detalleFactura AS de 					ON fa.id = de.idFactura					INNER JOIN productosfactura AS proF	ON proF.idDetalleFacura = de.id	INNER JOIN tipofactura AS tf					ON fa.idTipoFactura = tf.id					INNER JOIN tipopago AS tp					ON fa.idTipoPago = tp.id					INNER JOIN cliente AS cli					ON fa.idCliente = cli.id					INNER JOIN vendedor AS v					ON cli.idVendedor = v.id					INNER JOIN statusfactura AS sf					ON de.idStatusFactura = sf.id					INNER JOIN producto AS pro					ON proF.idProducto = pro.id";

                conn.query(query, (err, rows) => {
                    if(err){
                        console.log(err);
                        const queryError = `INSERT INTO log (nError, sqlMessage) VALUES ("${err.errno}", "${err.sqlMessage}")`;
                        conn.query(queryError, (err, rows) => {
                            if(err){
                                console.log(err);
                            }else{
                            }
                        })
                    }else{
                        return resolve(rows)
                    }
                })
            } catch (err) {
                console.log(err);
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
                            console.log(err);
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
                                    console.log(err);
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
                                            console.log(err);
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

    newFacturaCarga(tipoFactura, numeroFactura, fechaDocumento, fechaVencimiento, rutCliente, cantidad, precioUni, codigoProducto){
        //Obtenemos el codigo del tipo de pago
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
                            const queryDetalleFactura = `SELECT id FROM factura WHERE numeroFactura = '${numeroFactura}'`;

                            conn.query(queryDetalleFactura, (err, rowsFactura) => {
                                if(err){
                                }else{
                                    idFactura = rowsFactura[0].id;

                                    //Agregamos los detalles de la factua
                                    const query = `INSERT INTO detallefactura (iva, idFactura, idStatusFactura) VALUES (19, ${idFactura}, 3)`;

                                    conn.query(query, (err, rowsFactura) => {
                                        if(err){
                                            //console.log(err);
                                        }else{
                                            //Obtenemos el id de la insercion.
                                            let idInsert = rowsFactura.insertId;

                                            const queryIdProducto = `SELECT id FROM producto WHERE codigo = '${codigoProducto}'`;

                                            conn.query(queryIdProducto, (err, rowsFactura) => {
                                                if(err){
                                                }else{
                                                    idCodigoProducto = rowsFactura[0].id;
                                                    //Agregamos los detalles de la factua
                                                    const query = `INSERT INTO productosfactura (cantidad, precioUnitario, idProducto, idDetalleFacura) VALUES ('${cantidad}', '${precioUni}','${idCodigoProducto}','${idInsert}')`;

                                                    conn.query(query, (err, rowsFactura) => {
                                                        if(err){
                                                            console.log(err);
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
      
        // 86400 es el número de segundos en un día, luego multiplicamos por 1000 para obtener milisegundos.
        let newFecha =  new Date((numeroDeDias - diasDesde1900) * 86400 * 1000).toISOString().slice(0,10);
        return newFecha
    }
}

module.exports = FacturaService;