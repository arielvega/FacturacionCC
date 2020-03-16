const ValuePositiveInteger = require('../../framework/valueobject.js').ValuePositiveInteger;
var DataTester = require('../../framework/tester.js');

class NITEnteroPositivo extends ValuePositiveInteger {
    constructor(data) {
        super(data);
    }

    static _getValueName(){
        return "NIT";
    }
    
    static _getInstance(data){
        return new NITEnteroPositivo(data);
    }

}


module.exports = NITEnteroPositivo;


