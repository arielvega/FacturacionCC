module.exports = {
    Persona: function(nombre, nit){
        this.nombre = function testNombre(_nombre){
            if (_nombre.length == 0){
                throw new Error("El nombre no debe ser vacio");
            }
            return _nombre;
        }(nombre);
        
        this.nit = function testNit(_nit){
            _nit = Number.parseInt(_nit);
            if (!Number.isInteger(_nit) || (_nit < 0)){
                throw new Error("NIT no debe ser menor a 0");
            }
            return _nit;
        }(nit);
        
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


