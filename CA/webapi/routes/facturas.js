
const mEvents = require('../../framework/events.js');

const Commands = require('../../infrastructure/commands/v1/facturas.js');
const HandlersFactory = require('../../infrastructure/handlers/factory.js');

module.exports = function (app) {

    //CreateFactura
    app.route('/facturas/')
            .post(function (request, response) {
                var command = new Commands.CreateFactura(request.body);
                var handler = HandlersFactory(command);
                handler.addReadyListener(mEvents.Listener(response).listen);
                handler.handle(command);
            });

    //GetFacturas
    app.route('/facturas/:nit')
            .get(function (request, response) {
                var command = new Commands.GetFacturas(request.params);
                var handler = HandlersFactory(command);
                handler.addReadyListener(mEvents.Listener(response).listen);
                handler.handle(command);
            });

    //ListFactura
    app.route('/facturas/')
            .get(function (request, response) {
                var command = new Commands.ListFacturas();
                var handler = HandlersFactory(command);
                handler.addReadyListener(mEvents.Listener(response).listen);
                handler.handle(command);
            });
};


