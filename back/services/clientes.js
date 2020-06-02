const { conn } = require('../lib/mariadb');


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
}

module.exports = ClienteService;