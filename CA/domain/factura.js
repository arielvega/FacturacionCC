
const AggregateRoot = require('../framework/aggregate.js').AggregateRoot;
const EventsFactura = require('./events/factura.js');


const FacturaId = require('./valueobjects/facturaid.js');
const MontoNumeroPositivo = require('./valueobjects/montonumeropositivo.js');
const MonedaISO4217 = require('./valueobjects/monedaiso4217.js');

const EstadosFactura = require('./enums/estados.js').EstadosFactura;

class Factura extends AggregateRoot {

    constructor(data) {
        super();
        if (data) {
            this._Apply(new EventsFactura.FacturaCreated(data.facturaId, data.persona, data.monto, data.moneda, data.fecha));
        }
    }

    _When(event) {
        if (event instanceof EventsFactura.FacturaCreated) {
            this._loadFrom(event);
            this._estado = EstadosFactura.Emitida;
        }
    }

    _ValidateStatus() {
        ;
    }

    _loadFrom(data) {
        this._id = new FacturaId(data.facturaId);
        this._facturaId = this._id.value;
        this._personaId = data.persona.personaId;
        this._monto = MontoNumeroPositivo.fromNumber(data.monto);
        this._moneda = MonedaISO4217.fromISO(data.moneda);
        this._fecha = data.fecha;
        this._estado = data.estado;
        return this;
    }

    get facturaId() {
        return this._facturaId;
    }

    get personaId() {
        return this._personaId;
    }

    get monto() {
        return this._monto;
    }

    get moneda() {
        return this._moneda;
    }

    get fecha() {
        return this._fecha;
    }

    get estado() {
        return this._estado;
    }
}

module.exports = Factura;


