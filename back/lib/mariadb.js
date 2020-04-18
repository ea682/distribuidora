const mysql = require('mysql');

const { config } = require('../config/index')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const PORT = encodeURIComponent(config.port);
const HOST = encodeURIComponent(config.dbHost);
const DATABASE = encodeURIComponent(config.dbDatabase);

const conn = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  port: PORT,
  connectionLimit: 5
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

/*class MariaBD{

  getAll2(query){
    return new Promise((resolve, reject) => {
      conn.query()
    });
  }
}*/
module.exports = { conn };
/*class MariaDB{1
  getAll(){
    conn
    .getConnection()
    const result = query('select * from regiones')
    .then(result => {
      console.log("todo ok");
    })
  }
}

module.exports = MariaDB;*/
/*const mariaBD = pool.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    port: PORT,
    connectionLimit: 5
});

mariaBD
.getConnection()
.then(result => {
  console.log("ok");
})

async function getAll() {
  
}*/

