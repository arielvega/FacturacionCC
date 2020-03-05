module.exports = {
    Moneda: function (nombre) {
        var MONEY_VALUES = {
            "BOB": "Bs.", "USD": "$us."
        };
        this.nombre = function testNombre(_nombre) {
            var val = MONEY_VALUES[_nombre];
            if (!val) {
                throw new Error("Moneda no valida");
            }
            return _nombre;
        }(nombre);

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


