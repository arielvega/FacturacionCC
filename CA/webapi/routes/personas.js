
const mEvents = require('../../domain/events/events.js');

const Commands = require('../../infrastructure/commands/v1/personas.js');


module.exports = function (app) {

    //CreatePersona
    app.route('/personas/')
            .post(function (request, response) {
                var createPersona = new Commands.CreatePersona(request.body);
                const Persona = require('../../domain/valueobjects/persona.js').Persona;
                var persona = new Persona(createPersona.nombre, createPersona.nit);

                const mcPersonas = require('../../infrastructure/persistence/personas.js');
                var cpersonas = new mcPersonas.Personas();
                var result = cpersonas.save(persona);
                response.send(result);
            });

    //ListPersonas
    app.route('/personas/')
            .get(function (request, response) {
                var listPersonas = new Commands.ListPersonas();
                const Personas = require('../../infrastructure/persistence/personas.js').Personas;
                var cpersonas = new Personas();

                cpersonas.addReadyListener(mEvents.Listener(response).listen);
                cpersonas.list();
            });

    //GetPersona
    app.route('/personas/:nit')
            .get(function (request, response) {
                var getPersona = new Commands.GetPersona(request.params);
                const Personas = require('../../infrastructure/persistence/personas.js').Personas;
                var cpersonas = new Personas();

                cpersonas.addReadyListener(mEvents.Listener(response).listen);
                cpersonas.get(getPersona.nit);
            });
};


