const express = require('express');
const compradores = require('./routes/api/compradores');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.json());

app.use("/api/compradores", compradores);

const server = app.listen(8000, function() {
    console.log(`Listening http://localhost:${server.address().port}`);
  });