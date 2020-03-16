const Value = require('../../framework/valueobject.js').Value;
const Monedas = require('../enums/monedas.js').Monedas;
var DataTester = require('../../framework/tester.js');

class MonedaISO4217 extends Value {
    constructor(data) {
        super(data);
    }
    
    static fromISO(data){
        this._checkVality(data);
        return new MonedaISO4217(data);
    }

    static _checkVality(data) {
        if (!DataTester.isString(data)) {
            throw new Error("Moneda no puede estar vacio");
        }
        if (data.length != 3) {
            throw new Error("El codigo debe ser de 3 caracteres");
        }
        if (!DataTester.isIn(Monedas, data)){
            throw new Error("Moneda no valido");
        }
    }

}


module.exports = MonedaISO4217;

