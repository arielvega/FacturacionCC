const SystemEvent = require('./systemevent.js');

class FacturaCreated extends SystemEvent {
    constructor(facturaId, persona, monto, moneda, fecha){
        this.facturaId = facturaId;
        this.persona = persona;
        this.monto = monto;
        this.moneda = moneda;
        this.fecha = fecha;
        Object.freeze(this);
    }
}

module.exports = {FacturaCreated};


