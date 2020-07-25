const { conn } = require('../lib/mariadb');

const ValidarRut = require('./validarRut');
const validarRut = new ValidarRut();

class ClienteService{
    getAllClientes(){
        return new Promise(function (resolve, reject){
            const query = "select * from cliente";

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows)
            })
        });
    }

    getAllClientesTabla(){
        return new Promise(function (resolve, reject){
            const query = "SELECT cli.id, cli.rut, cli.nombreCliente, cli.direccion, cli.telefono, cli.giro, v.nombreVendedor FROM cliente AS cli INNER JOIN vendedor AS v ON cli.idVendedor = v.id";

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows)
            })
        });
    }

    newCliente(rut, nombreCliente, direccion, telefono, giro, comuna, idVendedor){
        return new Promise(function (resolve, reject){
            const query = `INSERT INTO cliente (rut, nombreCliente, direccion, telefono, giro, idComuna, idVendedor) VALUES ('${rut}', '${nombreCliente}', '${direccion}', '${telefono}', '${giro}', '${comuna}', '${idVendedor}');`;
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

    newClienteCarga(rut, nombreCliente, direccion, giro, codigoVendedor, telefono){
        return new Promise(function (resolve, reject){
            //Buscamos el codigo del vendedor
            const query = `SELECT id FROM vendedor WHERE codigo = "${codigoVendedor}" `;
            conn.query(query, (err, rows) => {
                if(err){
                    //console.log(err);
                }else{
                    //Le agregamos el codigo al vendedor.
                    if(rows[0] === "[]" || rows[0] === undefined){
                        //console.log(rows[0]);
                    }else{
                        let result = validarRut.Rut(rut);
                        if(!result){
                           let result2 =  validarRut.buscarRut(rut);
                           
                           if(result2 !== false){
                                rut = result2;
                           }
                        }
                        let idVendedor = rows[0].id;
                        const query = `INSERT INTO cliente (rut, nombreCliente, direccion, giro, idVendedor, telefono) VALUES ('${rut}', '${nombreCliente}', '${direccion}', '${giro}', '${idVendedor}', '${telefono}');`;
                        conn.query(query, (err, rows) => {
                            if(err){
                                //console.log(query);
                                return resolve(err);
                            }else{
                                return resolve(true);
                            }
                        });
                    }
                }
            });
        });
    }
}

module.exports = ClienteService;