const { conn } = require('../lib/mariadb');


class CompradoresService{
    getAll(){
        return new Promise(function (resolve, reject){

            //Creamos la consulta SQL
            const query = "select * from compradores";

            //Realizamos la consulta y recorremos los datos.
            conn.query(query, (err,rows) => {
                if(err) throw err;
                return resolve(rows);
            });
        });
    }

    getUser(email){
        return new Promise(function (resolve, reject){
            const query = "select * from users where Email = '"+email+"'";
            console.log(query);
            conn.query(query, (err,rows) => {
                if(err) throw err;
                //console.log(rows);
                //var datos = 123;
                return resolve(rows);
            });
        });
    }
}

module.exports = CompradoresService;