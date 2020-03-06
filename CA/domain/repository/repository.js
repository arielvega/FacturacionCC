const EventLauncher = require('../events/events.js').EventLauncher;

class Repository extends EventLauncher{
    constructor(){
        super();
    }
    
    get(id){
        throw new Error("Sin implementar!!!");
    }
    
    save(data){
        throw new Error("Sin implementar!!!");
    }
    
    list(){
        throw new Error("Sin implementar!!!");
    }
    
    delete(id){
        throw new Error("Sin implementar!!!");
    }
}

module.exports = Repository;


