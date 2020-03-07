
var DataChecker = require('../../framework/checker.js');

module.exports = {
    Persona: function(nombre, nit){

        this.nombre = DataChecker.isString(nombre);
        
        this.nit = DataChecker.isPositiveInteger(nit);
        
        this.equals = function(persona) {
            var isPersona = persona instanceof Persona;
            if(isPersona && persona.nombre == this.nombre && persona.nit == this.nit) {
                return true;
            } else {
                return false;
            }
        };
        
        Object.freeze(this);
    }
}


