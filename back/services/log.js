const { conn } = require('../lib/mariadb');


class LogService{
    getAllLog(){
        return new Promise(function (resolve, reject){
            const query = "select * from log";

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows)
            })
        });
    }

    newLog(error, nError, sqlMessage, sql){
        return new Promise(function (resolve, reject){
            const query = `INSERT INTO log (error, nError, sqlMessage, sql) VALUES ('${error}','${nError}', '${sqlMessage}', '${sql}');`;
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
}

module.exports = LogService;