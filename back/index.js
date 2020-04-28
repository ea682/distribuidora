const express = require('express');

const compradores = require('./routes/api/compradores');
const users = require('./routes/api/users');
const authApiRouter = require("./routes/api/auth");

const test = require('./test');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());

app.use("/api/compradores", compradores);
app.use("/api/users", users);
app.use("/api/auth", authApiRouter);
//app.use("/api/test", test);

const server = app.listen(8000, function() {
    console.log(`Listening http://localhost:${server.address().port}`);
  });