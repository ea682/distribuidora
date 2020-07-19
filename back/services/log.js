const { conn } = require('../lib/mariadb');


class LogService{
    getAllLog(){
        return new Promise(function (resolve, reject){
            const query = 'select * from log';

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows)
            })
        });
    }

    newLog(error, nError, sqlMessage){
        return new Promise(function (resolve, reject){

            //Eliminamos los caracteres que causen un error
            sqlMessage =  sqlMessage.replace(/\/'/g,'"').replace(/\/,/g,'');
            sqlMessage =  sqlMessage.replace(/\/,/g,'');
            nError = nError.replace(/\/,/g,'');
            if(error !== 1062){
                const query = `INSERT INTO log (error, nError, sqlMessage, sql) VALUES ('${error}','${nError}', '${sqlMessage}');`;
                conn.query(query, (err, rows) => {
                if(err){
                    console.log(err);
                    return resolve(err);
                }else{
                    return resolve(true);
                }
                });
            }
        });
    }
}

module.exports = LogService;