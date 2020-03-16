
var DataTester = require('./tester.js');

class Value {
    constructor(value){
        this._value = value;
    }
    
    get value(){
        return this._value;
    }
}

class ValuePositiveFloat extends Value {
    constructor(data) {
        super(data);
    }
    
    static _getValueName(data){
        throw new Error("Sin implementar!!!");
    }
    
    static _getInstance(data){
        throw new Error("Sin implementar!!!");
    }
    
    static fromNumber(data){
        this._checkVality(data);
        return this._getInstance(data);
    }

    static _checkVality(data) {
        if (!DataTester.isFloat(data)) {
            throw new Error("El " + this._getValueName() +" debe ser numero: " + data);
        }
        if (!DataTester.isPositive(data)) {
            throw new Error("El " + this._getValueName() +" debe ser positivo: " + data);
        }
    }

}

class ValuePositiveInteger extends Value {
    constructor(data) {
        super(data);
    }
    
    static _getValueName(data){
        throw new Error("Sin implementar!!!");
    }
    
    static _getInstance(data){
        throw new Error("Sin implementar!!!");
    }
    
    static fromNumber(data){
        this._checkVality(data);
        return this._getInstance(data);
    }

    static _checkVality(data) {
        if (!DataTester.isInteger(data)) {
            throw new Error("El " + this._getValueName() +" debe ser numero: " + data);
        }
        if (!DataTester.isPositive(data)) {
            throw new Error("El " + this._getValueName() +" debe ser positivo: " + data);
        }
    }

}

class ValueNumberId extends ValuePositiveInteger {
    constructor(data) {
        super(data);
    }
    
    static _getValueName(){
        return "ID";
    }
    
    static fromNumber(data){
        this._checkVality(data);
        return _getInstance(data);
    }

}

module.exports = {Value, ValuePositiveFloat, ValuePositiveInteger, ValueNumberId};

