
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());


app.get('/', function (request, response) {
    response.send('API Facturacion 1.0');
});

var routesPersonas = require('./routes/personas.js');
    routesPersonas(app);

var routesFacturas = require('./routes/facturas.js');
    routesFacturas(app);

console.log("Servidor listo en http://localhost:3000");

app.listen(3000);
