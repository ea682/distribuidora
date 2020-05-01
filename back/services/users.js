const { conn } = require('../lib/mariadb');
const bcrypt = require("bcrypt");

class UsersService{

    getAllUsers(){
        return new Promise(function (resolve, reject){
            const query = "SELECT * FROM users WHERE NombreUser != 'admin'";

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows)
            })
        });
    }

    getUser(email){
        return new Promise(function (resolve, reject){
            const query = `SELECT * FROM users WHERE Email = '${email}'`;
            console.log(query);
            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows);
            });
        });
    }

    validarLogin(email, password){
        return new Promise(function (resolve, Promise){
            const query = `SELECT * FROM users WHERE Email = '${email}' and Password = '${password}'`;

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows);
            });
        });
    }

    compararPassword(password1, password2){
        return new Promise(function (resolve, Promise){
            //Comparamos
            const resulValidacion = bcrypt.compare(password1, password2);
            if(resulValidacion){
                return resolve(resulValidacion);
            }
        });
    }
}

module.exports = UsersService;