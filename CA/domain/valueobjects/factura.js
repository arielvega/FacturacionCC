const mPersona = require('./persona.js');
const mMoneda = require('./moneda.js');
const mEstado = require('./estado.js');

var DataChecker = require('../../framework/checker.js');

module.exports = {
    Factura: function(persona, monto, moneda, fecha, estado){
        this.persona = DataChecker.isA(mPersona.Persona, persona);
        
        this.monto = DataChecker.isPositiveInteger(monto);
        
        this.moneda = DataChecker.isA(mMoneda.Moneda, moneda);
        
        this.fecha = DataChecker.isA(Date, fecha);
        
        this.estado = DataChecker.isA(mEstado.Estado, estado);
        
        Object.freeze(this);
    }
}


