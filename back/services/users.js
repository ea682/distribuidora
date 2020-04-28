const { conn } = require('../lib/mariadb');

class UsersService{

    getAllUsers(){
        return new Promise(function (resolve, reject){
            const query = "SELECT * FROM users";

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows)
            })
        });
    }

    getUser(email){
        return new Promise(function (resolve, reject){
            const query = "SELECT * FROM users WHERE Email = '"+email+"'";
            console.log(query);
            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows);
            });
        });
    }

    getEmailPasswordUser(user){
        return new Promise(function (resolve, Promise){
            const query = `SELECT Email, Password FROM users WHERE NombreUser = '${user} '`;

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows);
            });
        });
    }

    validarLogin(email){
        return new Promise(function (resolve, Promise){
            const query = `SELECT * FROM users WHERE NombreUser = '${email}'`

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows);
            });
        });
    }
}

module.exports = UsersService;