const ValuePositiveFloat = require('../../framework/valueobject.js').ValuePositiveFloat;

class MontoNumeroPositivo extends ValuePositiveFloat {
    constructor(data) {
        super(data);
    }

    static _getValueName(){
        return "Monto";
    }
    
    static _getInstance(data){
        return new MontoNumeroPositivo(data);
    }

}


module.exports = MontoNumeroPositivo;


