const mPersona = require('./persona.js');
const mMonto = require('./monto.js');
const mEstado = require('./estado.js');

module.exports = {
    Factura: function(persona, monto, fecha, estado){
        this.persona = function(_persona) {
            if(!(_persona instanceof mPersona.Persona)) {
                throw new Error("Persona no permitida");
            }
            return _persona;
        }(persona);
        
        this.monto = function(_monto) {
            if(!(_monto instanceof mMonto.Monto)) {
                throw new Error("Monto no permitido");
            }
            return _monto;
        }(monto);
        
        this.fecha = function(_fecha) {
            if(!(_fecha instanceof Date)) {
                throw new Error("Fecha no permitida");
            }
            return _fecha;
        }(fecha);
        
        this.estado = function(_estado) {
            if(!(_estado instanceof mEstado.Estado)) {
                throw new Error("Estado no permitido");
            }
            return _estado;
        }(estado);
        
        Object.freeze(this);
    }
}


