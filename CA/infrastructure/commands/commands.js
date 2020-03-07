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
}

class CommandHandler {
    handle(command) {
        throw new Error("Sin implementar!!!");
    }
}

module.exports = {Command, CommandHandler};
