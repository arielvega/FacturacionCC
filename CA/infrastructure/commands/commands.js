const EventLauncher = require('../../domain/events/events.js').EventLauncher;

class Command {
    constructor() {
    }

    load(object) {
        for (var prop in this) {
            var field = prop.replace('_', '');
            if (object.hasOwnProperty(field)) {
                this[prop] = object[field];
            }
        }
    }
    
    get version(){
        throw new Error("Sin implementar!!!");
    }
}

class CommandHandler extends EventLauncher{
    constructor() {
        super();
    }

    handle(command) {
        throw new Error("Sin implementar!!!");
    }
    
    listen(data){
        this.notifyReady(data);
    }
}

class CommandV1 extends Command{
    constructor() {
        super();
    }
    
    get version(){
        return 'v1';
    }
}

module.exports = {Command, CommandHandler, CommandV1};
