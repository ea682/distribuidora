const { conn } = require('../lib/mariadb');

class LocalizacionService{

    //Obtenemos toda las regiones
    getAllRegiones(){
        return new Promise(function (resolve, reject){
            const query = "SELECT * FROM regiones;"

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows);
            });
        });
    }

    //Obtenemos toda las Provincias
    getAllProvincias(idRegion){
        return new Promise(function (resolve, reject){
            const query = `SELECT * FROM provincias WHERE IdRegion = ${idRegion};`;

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows);
            });
        });
    }

    //Obtenemos toda las Comunas
    getAllComunas(idProvincia){
        return new Promise(function (resolve, reject){
            const query = `SELECT * FROM comunas WHERE IdProvincia = ${idProvincia};`;

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows);
            });
        });
    }
}

module.exports = LocalizacionService;