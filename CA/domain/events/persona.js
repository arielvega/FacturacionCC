class PersonaCreated {
    constructor(personaId, nit, nombre){
        this.personaId = personaId;
        this.nit = nit;
        this.nombre = nombre;
        Object.freeze(this);
    }
}

module.exports = {PersonaCreated};


