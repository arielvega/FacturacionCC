
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const mEvents = require('../domain/events/events.js');

app.get('/', function (request, response) {
    response.send('API Facturacion 1.0');
});

var routesPersonas = require('./routes/personas.js');
    routesPersonas(app);


//Factura
app.get('/facturas/', function (request,response){
    const factura =  require('../infrastructure/persistence/facturas.js');
    var cfacturas = new factura.Facturas()    
    cfacturas.addReadyListener(mEvents.Listener(response).listen)
    cfacturas.list()
})

app.get('/facturas/:nit', function (request,response){
    const factura =  require('../infrastructure/persistence/facturas.js');
    var cfacturas = new factura.Facturas()    
    cfacturas.addReadyListener(mEvents.Listener(response).listen)
    cfacturas.get(request.params.nit)
})

app.post('/facturas/', function (request, response) {
    
    const mPersona = require('../domain/valueobjects/persona.js');
    var persona = new mPersona.Persona(request.body.persona.nombre, request.body.persona.nit);
    
    const mcPersonas = require('../infrastructure/persistence/personas.js');
    var cpersonas = new mcPersonas.Personas();
    cpersonas.save(persona);
    
    const mcMoneda = require('../domain/valueobjects/moneda.js');
    var moneda = new mcMoneda.Moneda(request.body.moneda);

    var fecha = new Date(request.body.fecha);
    
    const mcEstado = require('../domain/valueobjects/estado.js');
    var estado = new mcEstado.Estado(request.body.estado);

    const mFactura = require('../domain/valueobjects/factura.js');
    var factura = new mFactura.Factura(persona , request.body.monto , moneda , fecha , estado );

    const mcFactura = require('../infrastructure/persistence/facturas.js');
    var cfacturas = new mcFactura.Facturas();
    var result = cfacturas.save(factura);
    response.send(result);
});



console.log("Servidor listo en http://localhost:3000");

app.listen(3000);
