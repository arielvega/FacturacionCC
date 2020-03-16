const CommandHandler = require('../../commands/commands.js').CommandHandler;

class CreateFacturaHandler extends CommandHandler {
    constructor() {
        super();
    }

    handle(command) {
        const Persona = require('../../../domain/persona.js');
        var persona = new Persona({"personaId": command.persona.nit, "nombre": command.persona.nombre, "nit": command.persona.nit});

        const Personas = require('../../persistence/personas.js').Personas;
        var cpersonas = new Personas();
        cpersonas.save(persona);

        var fecha = new Date();

        const Factura = require('../../../domain/factura.js');
        var factura = new Factura({"persona": persona, "monto": command.monto, "moneda": command.moneda, "fecha": fecha});

        const Facturas = require('../../persistence/facturas.js').Facturas;
        var cfacturas = new Facturas();
        var result = cfacturas.save(factura);
        this.notifyReady(result);
    }
}


class GetFacturasHandler extends CommandHandler {
    constructor() {
        super();
    }

    handle(command) {
        const Facturas = require('../../persistence/facturas.js').Facturas;
        var cfacturas = new Facturas();
        cfacturas.addReadyListener(this.listen.bind(this));
        cfacturas.get(command.nit);
    }
}


class ListFacturasHandler extends CommandHandler {
    constructor() {
        super();
    }

    handle(command) {
        const Facturas = require('../../persistence/facturas.js').Facturas;
        var cfacturas = new Facturas();

        cfacturas.addReadyListener(this.listen.bind(this))
        cfacturas.list()
    }
}

module.exports = {CreateFacturaHandler, GetFacturasHandler, ListFacturasHandler};


