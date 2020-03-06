const mPersona = require('./persona.js');
const mMonto = require('./monto.js');
const mEstado = require('./estado.js');

var Test = require('./tester.js');

module.exports = {
    Factura: function(persona, monto, fecha, estado){
        this.persona = Test.isA(mPersona.Persona, persona);
        
        this.monto = Test.isA(mMonto.Monto, monto);
        
        this.fecha = Test.isA(Date, fecha);
        
        this.estado = Test.isA(mEstado.Estado, estado);
        
        Object.freeze(this);
    }
}


