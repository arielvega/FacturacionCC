
var DataChecker = require('../../framework/checker.js');

module.exports = {
    Moneda: function (nombre) {
        var MONEY_VALUES = {
            "BOB": "Bs.", "USD": "$us."
        };
        
        this.nombre = DataChecker.isIn(MONEY_VALUES,nombre);

        this.abreviacion = MONEY_VALUES[this.nombre];

        this.equals = function (moneda) {
            var isMoneda = moneda instanceof Moneda;
            if (isMoneda && moneda.nombre == this.nombre) {
                return true;
            } else {
                return false;
            }
        };

        Object.freeze(this);
    }
}


