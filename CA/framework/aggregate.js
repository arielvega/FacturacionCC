
var DataTester = require('./tester.js');
const Value = require('./valueobject.js').Value;

class IInternalEventHandler {
    handle(event) {
        throw new Error("Sin implementar!!!");
    }
}

class DataStruct extends IInternalEventHandler {
    constructor() {
        super();
        this._id = 0;
    }

    get id() {
        return this._id;
    }

    _loadFrom(data) {
        throw new Error("Sin implementar!!!");
    }

    toJSON() {
        var res = {};
        for (var prop in this) {
            if ((prop != '_id') && !prop.startsWith('__')) {
                var field = prop.replace('_', '');
                var object = this[prop];
                if (DataTester.isA(Value, object)) {
                    res[field] = object.value;
                } else {
                    res[field] = object;
                }
            }
        }
        return res;
    }
}

class Entity extends DataStruct {

    constructor(applier) {
        super();
        this._applier = applier;
    }

    _When(event) {
        throw new Error("Sin implementar!!!");
    }

    _Apply(event) {
        this._When(event);
        this._applier(event);
    }

    handle(event) {
        this._When(event);
    }
}


class AggregateRoot extends DataStruct {

    constructor() {
        super();
        this.__changes = [];
    }

    _ValidateStatus() {
        throw new Error("Sin implementar!!!");
    }

    _When(event) {
        throw new Error("Sin implementar!!!");
    }

    _Apply(event) {
        this._When(event);
        this._ValidateStatus();
        this.__changes[this.__changes.length] = event;
    }

    getChanges() {
        this.__changes.slice();
    }

    clearChanges() {
        this.__changes = [];
    }

    _ApplyToEntity(entity, event) {
        entity = DataTester.isA(IInternalEventHandler, entity);
        entity.Handle(event);
    }

    handle(event) {
        this._When(event);
    }
}

module.exports = {IInternalEventHandler, Entity, AggregateRoot};

