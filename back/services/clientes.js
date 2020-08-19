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
            const query = "SELECT cli.id, cli.rut, cli.nombreCliente, cli.direccion, cli.telefono, cli.giro FROM cliente AS cli";

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows)
            })
        });
    }

    newCliente(rut, nombreCliente, direccion, telefono, giro, comuna){
        return new Promise(function (resolve, reject){
            const query = `INSERT INTO cliente (rut, nombreCliente, direccion, telefono, giro, idComuna) VALUES ('${rut}', '${nombreCliente}', '${direccion}', '${telefono}', '${giro}', '${comuna}');`;
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

    newClienteCarga(rut, nombreCliente, direccion, giro, telefono){
        return new Promise(function (resolve, reject){
            const query = `INSERT INTO cliente (rut, nombreCliente, direccion, giro, telefono) VALUES ('${rut}', '${nombreCliente}', '${direccion}', '${giro}', '${telefono}');`;
            conn.query(query, (err, rows) => {
                if(err){
                    if(err.errno !== 1062){
                        console.log(err);
                    }
                    //return resolve(err);
                }else{
                    return resolve(true);
                }
            });
        });
    }
}

module.exports = ClienteService;