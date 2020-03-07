const mPersona = require('./persona.js');
const mMoneda = require('./moneda.js');
const mEstado = require('./estado.js');

var Test = require('./tester.js');

module.exports = {
    Factura: function(persona, monto, moneda, fecha, estado){
        this.persona = Test.isA(mPersona.Persona, persona);
        
        this.monto = Test.isPositiveInteger(monto);
        
        this.moneda = Test.isA(mMoneda.Moneda, moneda);
        
        this.fecha = Test.isA(Date, fecha);
        
        this.estado = Test.isA(mEstado.Estado, estado);
        
        Object.freeze(this);
    }
}


