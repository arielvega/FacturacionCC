
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

function listener(responder){
    this.listen = function(list){
        responder.send(list);
    };
    return this;
}

app.get('/', function (request, response) {
    response.send('API Facturacion 1.0');
});


app.get('/personas/:nombre/:nit', function (request, response) {
    const persona = require('../domain/valueobjects/persona.js');
    var p = new persona.Persona(request.params.nombre, request.params.nit);
    response.send(p);
});

app.post('/personas/', function (request, response) {
    const mPersona = require('../domain/valueobjects/persona.js');
    var persona = new mPersona.Persona(request.body.nombre, request.body.nit);
    
    const mcPersonas = require('../infrastructure/persistence/personas.js');
    var cpersonas = new mcPersonas.Personas();
    var result = cpersonas.save(persona);
    response.send(result);
});

app.get('/personas/', function (request, response) {
    const mcPersonas = require('../infrastructure/persistence/personas.js');
    var cpersonas = new mcPersonas.Personas();
    cpersonas.addReadyListener(listener(response).listen);
    cpersonas.list();
});

app.get('/personas/:nit', function (request, response) {
    const mcPersonas = require('../infrastructure/persistence/personas.js');
    var cpersonas = new mcPersonas.Personas();
    cpersonas.addReadyListener(listener(response).listen);
    cpersonas.get(request.params.nit);
});


app.get('/monedas/:nombre', function (request, response) {
    const moneda = require('../domain/valueobjects/moneda.js');
    var m = new moneda.Moneda(request.params.nombre);
    response.send(m);
});


app.get('/montos/:moneda/:valor', function (request, response) {
    const moneda = require('../domain/valueobjects/moneda.js');
    var m = new moneda.Moneda(request.params.moneda);
    const monto = require('../domain/valueobjects/monto.js');
    var mnt = new monto.Monto(request.params.valor, m);
    response.send(mnt);
});


console.log("Servidor listo en http://localhost:3000");

app.listen(3000);
