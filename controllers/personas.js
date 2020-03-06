const mPersona = require('../domainobjects/persona.js');
const Repository = require('../framework/repository.js');

class Personas extends Repository {
    
    constructor() {
        super();
        const sqlite3 = require('sqlite3').verbose();
        this._db = new sqlite3.Database('./data/data.db');
        this.listeners = {readyListeners: []};
        global.PersonasObject = this;
    }
    
    addReadyListener(listener) {
        this.listeners.readyListeners[this.listeners.readyListeners.length] = listener;
    }

    notifyReady(data) {
        for (var i = 0; i < this.listeners.readyListeners.length; i++) {
            this.listeners.readyListeners[i](data);
        }
    }

    list() {
        var sql = "SELECT nit,nombre FROM persona";
        this._db.all(sql, [], this._listFunction);
    }
    
    _listFunction(err, rows) {
        if (err) {
            return console.error(err.message);
        }
        var resultlist = [];
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            resultlist[resultlist.length] = new mPersona.Persona(row.nombre, row.nit);
        }
        global.PersonasObject.notifyReady(resultlist);
    }
    
    get(nit) {
        var sql = "SELECT nit,nombre FROM persona WHERE nit = ?";
        this._db.get(sql, [nit], this._getFunction);
    }
    
    _getFunction(err, row) {
        if (err) {
            return console.error(err.message);
        }
        var result = (row
                ? new mPersona.Persona(row.nombre, row.nit)
                : {});
        global.PersonasObject.notifyReady(result);
    }
    
    save(persona) {
        if (!(persona instanceof mPersona.Persona)) {
            return false;
        }
        var stmt = this._db.prepare("INSERT OR IGNORE INTO persona VALUES (?,?)");
        stmt.run(persona.nit, persona.nombre);
        stmt.finalize();
        return true;
    }
}

module.exports = {Personas}
