const express = require('express');


const authApiRouter = require("./routes/api/auth");
const compradores = require('./routes/api/compradores');
const users = require('./routes/api/users');
const localizacion = require('./routes/api/localizacion');
const clientes = require('./routes/api/clientes');
const producto = require('./routes/api/producto');
const tipos = require('./routes/api/tipos');
const factura = require('./routes/api/factura');
const vendedor = require('./routes/api/vendedor');
const test = require('./test');

const bodyparser = require('body-parser');

const app = express();



app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(bodyparser.json());
app.use("/api/compradores", compradores);
app.use("/api/users", users);
app.use("/api/clientes", clientes);
app.use("/api/producto", producto);
app.use("/api/vendedor", vendedor);
app.use("/api/tipos", tipos);
app.use("/api/factura", factura);
app.use("/api/localizacion", localizacion);
app.use("/api/auth", authApiRouter);
app.use("/api/test", test);


const server = app.listen(8000, function() {
    console.log(`Listening http://localhost:${server.address().port}`);
  });