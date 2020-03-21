const CommandHandler = require('../../commands/commands.js').CommandHandler;

class FacturaCommandHandler extends CommandHandler {
    constructor() {
        super();
        const FacturasRepository = require('../../persistence/facturasrepository.js');
        this.facturasrepository = new FacturasRepository();
        this.facturasrepository.addReadyListener(this.listen.bind(this));
    }
}

class CreateFacturaHandler extends FacturaCommandHandler {
    constructor() {
        super();
    }

    handle(command) {
        const Persona = require('../../../domain/persona.js');
        var persona = new Persona({"personaId": command.persona.nit, "nombre": command.persona.nombre, "nit": command.persona.nit});

        const PersonasRepository = require('../../persistence/personasrepository.js');
        var cpersonas = new PersonasRepository();
        cpersonas.save(persona);

        var fecha = new Date();

        const Factura = require('../../../domain/factura.js');
        var factura = new Factura({"persona": persona, "monto": command.monto, "moneda": command.moneda, "fecha": fecha});

        var result = this.facturasrepository.save(factura);
        this.notifyReady(result);
    }
}


class GetFacturasHandler extends FacturaCommandHandler {
    constructor() {
        super();
    }

    handle(command) {
        this.facturasrepository.get(command.nit);
    }
}


class ListFacturasHandler extends FacturaCommandHandler {
    constructor() {
        super();
    }

    handle(command) {
        this.facturasrepository.list();
    }
}

module.exports = {CreateFacturaHandler, GetFacturasHandler, ListFacturasHandler};


