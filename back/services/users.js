const { conn } = require('../lib/mariadb');
const bcrypt = require("bcrypt");
const dateTime = require('node-datetime');

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
        return new Promise(function (resolve, reject){
            const query = `SELECT * FROM users WHERE Email = '${email}' and Password = '${password}'`;

            conn.query(query, (err, rows) => {
                if(err) throw err;
                return resolve(rows);
            });
        });
    }

    compararPassword(password1, password2){
        return new Promise(function (resolve, reject){
            //Comparamos
            const resulValidacion = bcrypt.compare(password1, password2);
            if(resulValidacion){
                return resolve(resulValidacion);
            }
        });
    }

    insertUser(userName, email, password){
        return new Promise(function (resolve, reject){
            try {
                let passwordHash = "";
                //Encritamos la clave del usuario.
                bcrypt.hash(password, 10, function(err, hash) {
                    if (err) {
                        return next(err); 
                    }
                    passwordHash = hash;
                    

                    //Obtenemos la fecha actual.
                    let dt = dateTime.create();
                    let fechaActual = dt.format('Y-m-d H:M:S')

                    //Concatenmas la consulta
                    const query = `INSERT INTO users (NombreUser, email, Password, FechaCreacion, FechaModificacion, IdPermisos) VALUES ('${userName}', '${email}', '${passwordHash}', '${fechaActual}', '${fechaActual}', 1)`;

                    //Realizamos la perticion a la SQL
                    conn.query(query, function(err, result){
                        if(err){
                            return resolve(false);
                        }
                        else{
                            return resolve(true);
                        }
                        
                    });
                });
            } catch (error) {
                console.log(error);
               return resolve(error); 
            }
            
        });
        
    }
}

module.exports = UsersService;