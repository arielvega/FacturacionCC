
const Persona = require('../../domain/persona.js');
const Repository = require('../../domain/repository/repository.js');

class Personas extends Repository {
    
    constructor() {
        super();
        const sqlite3 = require('sqlite3').verbose();
        this._db = new sqlite3.Database('./data/data.db');
    }

    list() {
        var sql = "SELECT nit AS personaId, nit,nombre FROM persona";
        this._db.all(sql, [], this._listFunction.bind(this));
    }
    
    _listFunction(err, rows) {
        if (err) {
            return console.error(err.message);
        }
        var resultlist = [];
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            resultlist[resultlist.length] = (new Persona())._loadFrom(row);
        }
        this.notifyReady(resultlist);
    }
    
    get(nit) {
        var sql = "SELECT nit AS personaId, nit,nombre FROM persona WHERE nit = ?";
        this._db.get(sql, [nit], this._getFunction.bind(this));
    }
    
    _getFunction(err, row) {
        if (err) {
            return console.error(err.message);
        }
        var result = (row
                ? (new Persona())._loadFrom(row)
                : {});
        this.notifyReady(result);
    }
    
    save(persona) {
        if (!(persona instanceof Persona)) {
            return false;
        }
        var stmt = this._db.prepare("INSERT OR IGNORE INTO persona VALUES (?,?)");
        stmt.run(persona.nit.value, persona.nombre.value);
        stmt.finalize();
        return this._db.lastInsertRowId;
    }
}

module.exports = {Personas}
