class EventLauncher {

    constructor() {
        this.listeners = {};
    }

    addReadyListener(listener) {
        this.listen('ready', listener);
    }

    notifyReady(data) {
        this.emit('ready', data);
    }

    listen(event, listener) {
        if (this.listeners[event] == null) {
            this.listeners[event] = [];
        }
        this.listeners[event][this.listeners[event].length] = listener;
    }

    emit(event, data) {
        if (this.listeners[event] != null) {
            for (var i = 0; i < this.listeners[event].length; i++) {
                this.listeners[event][i](data);
            }
        }
    }
}

module.exports = {EventLauncher}


