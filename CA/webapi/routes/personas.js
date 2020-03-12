
const mEvents = require('../../framework/events.js');

const Commands = require('../../infrastructure/commands/v1/personas.js');
const HandlersFactory = require('../../infrastructure/handlers/factory.js');


module.exports = function (app) {

    //CreatePersona
    app.route('/personas/')
            .post(function (request, response) {
                var command = new Commands.CreatePersona(request.body);
                var handler = HandlersFactory(command);
                handler.addReadyListener(mEvents.Listener(response).listen);
                handler.handle(command);
            });

    //ListPersonas
    app.route('/personas/')
            .get(function (request, response) {
                var command = new Commands.ListPersonas();
                var handler = HandlersFactory(command);
                handler.addReadyListener(mEvents.Listener(response).listen);
                handler.handle(command);
            });

    //GetPersona
    app.route('/personas/:nit')
            .get(function (request, response) {
                var command = new Commands.GetPersona(request.params);
                var handler = HandlersFactory(command);
                handler.addReadyListener(mEvents.Listener(response).listen);
                handler.handle(command);
            });
};


