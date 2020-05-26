const { conn } = require('../lib/mariadb');


class ClienteService{
    getAllClientes(){
        return new Promise(function (resolve, reject){
            const query = "SELECT cli.rut, cli.nombreCliente, cli.direccion, cli.giro, co.NombreComunas, tipo.NombreTipoCliente FROM cliente AS cli INNER JOIN comunas AS co  ON cli.idComuna = co.id INNER JOIN tipoCliente AS tipo ON cli.idTipoCliente = tipo.id";

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows)
            })
        });
    }

    newCliente(rut, nombreCliente, direccion, giro, comuna, tipoCliente){
        return new Promise(function (resolve, reject){
            const query = `INSERT INTO cliente (rut, nombreCliente, direccion, giro, idComuna, idTipoCliente) VALUES ('${rut}', '${nombreCliente}', '${direccion}', '${giro}', '${comuna}', '${tipoCliente}');`;
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

    deleteCliente(){

    }

    updateCliente(){

    }
}

module.exports = ClienteService;