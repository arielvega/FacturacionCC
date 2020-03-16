
EstadosFactura = {
    "Emitida": 0,
    "Anulada": 1,
    "Entregada": 2,
    "Revertida": 3,
    "Declarada": 4
};

Object.freeze(EstadosFactura);


module.exports = { EstadosFactura };


