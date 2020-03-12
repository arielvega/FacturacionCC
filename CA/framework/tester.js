var DataTester = function () {
    var isA = function (type, data) {
        var testIsA = data instanceof type;
        return testIsA;
    };

    var isPositiveInteger = function (_valor) {
        _valor = Number.parseInt(_valor);
        return !(!Number.isInteger(_valor) || (_valor < 0));
    };

    var isIn = function (collection, dato) {
        var value = collection[dato];
        return value;
    };

    var isString = function (cadena) {
        return !(!cadena || cadena.length === 0);
    };

    var isStringLength = function (cadena, length) {
        return !(!cadena || cadena.length === length);
    };

    return {
        isA: isA,
        isPositiveInteger: isPositiveInteger,
        isIn: isIn,
        isString: isString,
        isStringLength: isStringLength
    };
}();

module.exports = DataTester;


