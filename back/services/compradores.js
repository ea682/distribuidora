const { conn } = require('../lib/mariadb');


class CompradoresService{
    getAll(){
        return new Promise(function (resolve, reject){
            const query = "select * from regiones";
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