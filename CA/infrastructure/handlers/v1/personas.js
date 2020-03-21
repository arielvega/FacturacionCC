const CommandHandler = require('../../commands/commands.js').CommandHandler;

class PersonaCommandHandler extends CommandHandler {
    constructor() {
        super();
        const PersonasRepository = require('../../persistence/personasrepository.js');
        this.personasrepository = new PersonasRepository();
        this.personasrepository.addReadyListener(this.listen.bind(this));
    }
}

class CreatePersonaHandler extends PersonaCommandHandler {
    constructor() {
        super();
    }

    handle(command) {
        const Persona = require('../../../domain/persona.js');
        var persona = new Persona({"personbaId": command.nit, "nit": command.nit, "nombre": command.nombre});
        var result = this.personasrepository.save(persona);
        this.notifyReady(result);
    }
}

class GetPersonaHandler extends PersonaCommandHandler {
    constructor() {
        super();
    }

    handle(command) {
        this.personasrepository.get(command.nit);
    }
}

class ListPersonasHandler extends PersonaCommandHandler {
    constructor() {
        super();
    }

    handle(command) {
        this.personasrepository.list();
    }
}

module.exports = {CreatePersonaHandler, GetPersonaHandler, ListPersonasHandler};


