const mMoneda = require('./moneda.js');
var Test = require('../framework/tester.js');

module.exports = {
    Monto: function (valor, moneda) {
        this.moneda = Test.isA(mMoneda.Moneda, moneda);

        this.valor = Test.isPositiveInteger(valor);

        this.equals = function (monto) {
            var isMonto = monto instanceof Monto;
            if (isMonto && monto.moneda.equals(this.moneda) && monto.valor == this.valor) {
                return true;
            } else {
                return false;
            }
        };

        Object.freeze(this);
    }
}

