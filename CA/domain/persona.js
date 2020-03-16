
const AggregateRoot = require('../framework/aggregate.js').AggregateRoot;
const EventsPersona = require('./events/persona.js');


const PersonaId = require('./valueobjects/personaid.js');
const Nombre500 = require('./valueobjects/nombre500.js');
const NITEnteroPositivo = require('./valueobjects/nitenteropositivo.js');


class Persona extends AggregateRoot {

    constructor(data) {
        super();
        if (data) {
            this._Apply(new EventsPersona.PersonaCreated(data.personaId, data.nit, data.nombre));
        }
    }

    _When(event) {
        if (event instanceof EventsPersona.PersonaCreated) {
            this._loadFrom(event);
        }
    }

    _loadFrom(data) {
        this._id = new PersonaId(data.personaId);
        this._personaId = this._id.value;
        this._nit = NITEnteroPositivo.fromNumber(data.nit);
        this._nombre = Nombre500.fromString(data.nombre);
        return this;
    }

    _ValidateStatus() {
        ;
    }

    get personaId() {
        return this._personaId;
    }

    get nombre() {
        return this._nombre;
    }

    get nit() {
        return this._nit;
    }
}


module.exports = Persona;
