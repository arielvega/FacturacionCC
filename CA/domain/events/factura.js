class FacturaCreated {
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


