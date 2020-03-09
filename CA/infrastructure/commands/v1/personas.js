var DataChecker = require('../../../framework/checker.js');
const CommandV1 = require('../commands.js').CommandV1;

class CreatePersona extends CommandV1{
    constructor(data){
        super();
        this._nombre = '_';
        this._nit = 0;
        this.load(data);
    }
    
    set nombre(dato){
        this._nombre = DataChecker.isString(dato);
    }
    
    set nit(dato){
        this._nit = DataChecker.isPositiveInteger(dato);
    }
    
    get nombre(){
        return this._nombre;
    }
    
    get nit(){
        return this._nit;
    }
}

class GetPersona extends CommandV1{
    constructor(data){
        super();
        this._nit = 0;
        this.load(data);
    }
    
    set nit(dato){
        this._nit = DataChecker.isPositiveInteger(dato);
    }
    
    get nit(){
        return this._nit;
    }
}

class ListPersonas extends CommandV1{
    constructor(){
        super();
    }
}

module.exports = {CreatePersona, GetPersona, ListPersonas};


