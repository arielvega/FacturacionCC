const Value = require('../framework/valueobject.js').Value;
var DataTester = require('../../framework/checker.js');

class Nombre500 extends Value {
    constructor(data) {
        super(data);
    }
    
    static fromString(data){
        this._checkVality(data);
        return new Nombre500(data);
    }

    static _checkVality(data) {
        if (!DataTester.isString(data)) {
            throw new Error("El nombre no puede estar vacio");
        }
        if (data.length > 500) {
            throw new Error("El nombre no debe tener mas de 500 caracteres");
        }
    }

}


module.exports = Nombre500;

