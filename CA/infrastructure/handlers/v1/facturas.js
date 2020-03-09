const CommandHandler = require('../../commands/commands.js').CommandHandler;

class CreateFacturaHandler extends CommandHandler {
    constructor() {
        super();
    }

    handle(command) {
        const Persona = require('../../../domain/valueobjects/persona.js').Persona;
        var persona = new Persona(command.persona.nombre, command.persona.nit);

        const Personas = require('../../persistence/personas.js').Personas;
        var cpersonas = new Personas();
        cpersonas.save(persona);

        const Moneda = require('../../../domain/valueobjects/moneda.js').Moneda;
        var moneda = new Moneda(command.moneda);

        var fecha = new Date(command.fecha);

        const Estado = require('../../../domain/valueobjects/estado.js').Estado;
        var estado = new Estado(command.estado);

        const Factura = require('../../../domain/valueobjects/factura.js').Factura;
        var factura = new Factura(persona, command.monto, moneda, fecha, estado);

        const Facturas = require('../../persistence/facturas.js').Facturas;
        var cfacturas = new Facturas();
        var result = cfacturas.save(factura);
        this.notifyReady(result);
    }
}


class GetFacturaHandler extends CommandHandler {
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

module.exports = {CreateFacturaHandler, GetFacturaHandler, ListFacturasHandler};


