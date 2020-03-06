
var Test = require('./tester.js');

module.exports = {
    Persona: function(nombre, nit){

        this.nombre = Test.isString(nombre);
        
        this.nit = Test.isPositiveInteger(nit);
        
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


