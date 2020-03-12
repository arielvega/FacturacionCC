class PersonaCreated {
    constructor(id, nombre, nit){
        this.id = id;
        this.nombre = nombre;
        this.nit = nit;
        Object.freeze(this);
    }
}

module.exports = {PersonaCreated};


