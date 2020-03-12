
const AggregateRoot = require('../framework/aggregate.js').AggregateRoot;
const EventsPersona = require('./events/persona.js');

const Nombre500 = require('./valueobjects/nombre500.js');
var DataChecker = require('../framework/checker.js');

class Persona extends AggregateRoot{
    
    constructor(nombre, nit) {
        super();
        this._Apply(new EventsPersona.PersonaCreated(id, nombre, nit));
    }

    equals(persona) {
        var isPersona = persona instanceof Persona;
        if (isPersona && persona.nombre == this.nombre && persona.nit == this.nit) {
            return true;
        } else {
            return false;
        }
    }

    _When(event) {
        if (event instanceof EventsPersona.PersonaCreated) {
            this._id = event.id;
            this._nombre = Nombre500.fromString(event.nombre);
        }
    }
}


module.exports = { Persona };
