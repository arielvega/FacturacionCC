const ValueNumberId = require('../../framework/valueobject.js').ValueNumberId;

class PersonaId extends ValueNumberId {
    constructor(data) {
        super(data);
    }
    
    static _getInstance(data){
        return new PersonaId(data);
    }

}


module.exports = PersonaId;