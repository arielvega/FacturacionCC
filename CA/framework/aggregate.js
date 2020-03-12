
var DataChecker = require('./checker.js');

class IInternalEventHandler {
    handle(event){
        throw new Error("Sin implementar!!!");
    }
}

class Entity extends IInternalEventHandler {

    constructor() {
        super();
        this._id = 0;
    }

    _setApplier(applier) {
        this._applier = applier;
    }

    _applier(event) {
        throw new Error("Sin implementar!!!");
    }

    _When(event) {
        throw new Error("Sin implementar!!!");
    }

    _Apply(event) {
        this._When(event);
        this._applier(event);
    }

    get Id() {
        return this._id;
    }

    handle(event) {
        this._When(event);
    }
}


class AggregateRoot extends IInternalEventHandler {

    constructor() {
        super();
        this._id = 0;
        this._changes = [];
    }

    _ValidateStatus() {
        throw new Error("Sin implementar!!!");
    }

    _When(event) {
        throw new Error("Sin implementar!!!");
    }

    _Apply(event) {
        this._When(event);
        this._applier(event);
        this._changes[this._changes.length] = event;
    }

    getChanges() {
        this._changes.slice();
    }

    clearChanges() {
        this._changes = [];
    }

    _ApplyToEntity(entity, event) {
        entity = DataChecker.isA(IInternalEventHandler, entity);
        entity.Handle(event);
    }

    get Id() {
        return this._id;
    }

    handle(event) {
        this._When(event);
    }
}

module.exports = {IInternalEventHandler, Entity, AggregateRoot};

