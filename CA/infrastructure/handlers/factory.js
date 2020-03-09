class FactoryHandler{
    constructor(){    
    }
    
    getHandler(command){
        throw new Error("Sin implementar!!!");
    }
}

const CommandsPersonasV1 = require('../commands/v1/personas.js');
const HandlersPersonasV1 = require('../handlers/v1/personas.js');

const CommandsFacturasV1 = require('../commands/v1/facturas.js');
const HandlersFacturasV1 = require('../handlers/v1/facturas.js');

class HandlerFactoryV1 extends FactoryHandler {
    constructor(){
        super();
    }

    getHandler(command){
        if (command instanceof CommandsPersonasV1.CreatePersona){
            return new HandlersPersonasV1.CreatePersonaHandler();
        }
        if (command instanceof CommandsPersonasV1.ListPersonas){
            return new HandlersPersonasV1.ListPersonasHandler();
        }
        if (command instanceof CommandsPersonasV1.GetPersona){
            return new HandlersPersonasV1.GetPersonaHandler();
        }
        if (command instanceof CommandsFacturasV1.CreateFactura){
            return new HandlersFacturasV1.CreateFacturaHandler();
        }
        if (command instanceof CommandsFacturasV1.ListFacturas){
            return new HandlersFacturasV1.ListFacturasHandler();
        }
        if (command instanceof CommandsFacturasV1.GetFacturas){
            return new HandlersFacturasV1.GetFacturasHandler();
        }
        throw new Error("Sin implementar!!!");
    }
}

var HandlerFactoryFactory = function(command){
    var factories = {
        'v1' : new HandlerFactoryV1()
    };
    return factories[command.version].getHandler(command);
}

module.exports = HandlerFactoryFactory;