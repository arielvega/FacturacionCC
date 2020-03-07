
var DataChecker = require('../../framework/checker.js');

module.exports = {
    Estado: function (nombre) {
        var STATUS_VALUES = {
            "Emitida": "E", "Anulada": "A", "Entregada": "N", "Revertida": "R",  "Declarada": "D",
        };

        this.nombre = DataChecker.isIn(STATUS_VALUES, nombre);

        this.abreviacion = STATUS_VALUES[this.nombre];

        this.equals = function (estado) {
            var isStatus = estado instanceof Estado;
            if (isStatus && estado.nombre == this.nombre) {
                return true;
            } else {
                return false;
            }
        };

        Object.freeze(this);
    }
}


