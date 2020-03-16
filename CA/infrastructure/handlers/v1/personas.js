const CommandHandler = require('../../commands/commands.js').CommandHandler;

class CreatePersonaHandler extends CommandHandler {
    constructor() {
        super();
    }

    handle(command) {
        const Persona = require('../../../domain/persona.js');
        var persona = new Persona({"personbaId": command.nit, "nit": command.nit, "nombre": command.nombre});

        const mcPersonas = require('../../persistence/personas.js');
        var cpersonas = new mcPersonas.Personas();
        var result = cpersonas.save(persona);
        this.notifyReady(result);
    }
}

class GetPersonaHandler extends CommandHandler {
    constructor() {
        super();
    }

    handle(command) {
        const Personas = require('../../persistence/personas.js').Personas;
        var cpersonas = new Personas();

        cpersonas.addReadyListener(this.listen.bind(this));
        cpersonas.get(command.nit);
    }
}

class ListPersonasHandler extends CommandHandler {
    constructor() {
        super();
    }

    handle(command) {
        const Personas = require('../../persistence/personas.js').Personas;
        var cpersonas = new Personas();

        cpersonas.addReadyListener(this.listen.bind(this));
        cpersonas.list();
    }
}

module.exports = {CreatePersonaHandler, GetPersonaHandler, ListPersonasHandler};


