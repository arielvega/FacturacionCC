const ValueNumberId = require('../../framework/valueobject.js').ValueNumberId;

class FacturaId extends ValueNumberId {
    constructor(data) {
        super(data);
    }
    
    static _getInstance(data){
        return new FacturaId(data);
    }

}


module.exports = FacturaId;