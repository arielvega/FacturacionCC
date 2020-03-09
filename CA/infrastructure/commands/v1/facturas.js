var DataChecker = require('../../../framework/checker.js');
const CommandV1 = require('../commands.js').CommandV1;

class CreateFactura extends CommandV1{
    constructor(data){
        super();
        this._persona = {nombre: '', nit: 0};
        this._monto = 0;
        this._moneda = '';
        this._estado = '';
        this._fecha = '';
        this.load(data);
    }
    
    set persona(dato){
        this._persona.nombre = DataChecker.isString(dato.nombre);
        this._persona.nit = DataChecker.isPositiveInteger(dato.nit);
    }
    
    get persona(){
        return this._persona;
    }
    
    set monto(dato){
        this._monto = DataChecker.isPositiveInteger(dato);
    }
    
    set moneda(dato){
        this._moneda = DataChecker.isString(dato);
    }
    
    get monto(){
        return this._monto;
    }
    
    get moneda(){
        return this._moneda;
    }
    
    set estado(dato){
        this._estado = DataChecker.isString(dato);
    }
    
    set fecha(dato){
        this._fecha = DataChecker.isString(dato);
    }
    
    get estado(){
        return this._estado;
    }
    
    get fecha(){
        return this._fecha;
    }
}

class GetFacturas extends CommandV1{
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

class ListFacturas extends CommandV1{
    constructor(){
        super();
    }
}

module.exports = {CreateFactura, GetFacturas, ListFacturas};


