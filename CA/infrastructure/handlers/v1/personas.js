const CommandHandler = require('../../commands/commands.js').CommandHandler;

class CreatePersonaHandler extends CommandHandler {
    constructor() {
        super();
    }

    handle(command) {
        const Persona = require('../../../domain/valueobjects/persona.js').Persona;
        var persona = new Persona(command.nombre, command.nit);

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


