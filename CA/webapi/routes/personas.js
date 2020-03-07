


module.exports = function (app) {
    
    app.route('/personas/:nombre/:nit')
            .get(function (request, response) {
                const persona = require('../../domain/valueobjects/persona.js');
                var p = new persona.Persona(request.params.nombre, request.params.nit);
                response.send(p);
            });


    app.route('/personas/')
            .post(function (request, response) {
                const mPersona = require('../../domain/valueobjects/persona.js');
                var persona = new mPersona.Persona(request.body.nombre, request.body.nit);

                const mcPersonas = require('../../infrastructure/persistence/personas.js');
                var cpersonas = new mcPersonas.Personas();
                var result = cpersonas.save(persona);
                response.send(result);
            });


    app.route('/personas/')
            .get(function (request, response) {
                const mcPersonas = require('../../infrastructure/persistence/personas.js');
                var cpersonas = new mcPersonas.Personas();

                const mEvents = require('../../domain/events/events.js');
                cpersonas.addReadyListener(mEvents.Listener(response).listen);
                cpersonas.list();
            });

    app.route('/personas/:nit')
            .get(function (request, response) {
                const mcPersonas = require('../../infrastructure/persistence/personas.js');
                var cpersonas = new mcPersonas.Personas();

                const mEvents = require('../../domain/events/events.js');
                cpersonas.addReadyListener(mEvents.Listener(response).listen);
                cpersonas.get(request.params.nit);
            });
};


