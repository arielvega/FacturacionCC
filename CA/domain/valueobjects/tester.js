var Test = function () {
    var isA = function (type, data) {
        var testIsA = data instanceof type;
        if (!testIsA) {
            throw new Error(type.name + " no valido");
        }
        return data;
    };

    var isPositiveInteger = function (_valor) {
        _valor = Number.parseInt(_valor);
        if (!Number.isInteger(_valor) || (_valor < 0)) {
            throw new Error("Valor no debe ser menor a 0: " + _valor);
        }
        return _valor;
    };

    var isIn = function (collection, dato) {
        var value = collection[dato];
        if (!value) {
            throw new Error("Dato no valido");
        }
        return dato;
    };

    var isString = function (cadena) {
        if (cadena.length == 0) {
            throw new Error("La cadena no debe ser vacia");
        }
        return cadena;
    };

    return {
        isA: isA,
        isPositiveInteger: isPositiveInteger,
        isIn: isIn,
        isString: isString
    };
}();

module.exports = Test;


