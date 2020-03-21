const CommandHandler = require('../../commands/commands.js').CommandHandler;

class CreatePersonaHandler extends CommandHandler {
    constructor() {
        super();
    }

    handle(command) {
        const Persona = require('../../../domain/persona.js');
        var persona = new Persona({"personbaId": command.nit, "nit": command.nit, "nombre": command.nombre});

        const PersonasRepository = require('../../persistence/personasrepository.js').PersonasRepository;
        var cpersonas = new PersonasRepository();
        var result = cpersonas.save(persona);
        this.notifyReady(result);
    }
}

class GetPersonaHandler extends CommandHandler {
    constructor() {
        super();
    }

    handle(command) {
        const PersonasRepository = require('../../persistence/personasrepository.js').PersonasRepository;
        var cpersonas = new PersonasRepository();

        cpersonas.addReadyListener(this.listen.bind(this));
        cpersonas.get(command.nit);
    }
}

class ListPersonasHandler extends CommandHandler {
    constructor() {
        super();
    }

    handle(command) {
        const PersonasRepository = require('../../persistence/personasrepository.js').PersonasRepository;
        var cpersonas = new PersonasRepository();

        cpersonas.addReadyListener(this.listen.bind(this));
        cpersonas.list();
    }
}

module.exports = {CreatePersonaHandler, GetPersonaHandler, ListPersonasHandler};


