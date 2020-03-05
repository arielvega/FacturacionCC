const mPersona = require('../domainobjects/persona.js');


module.exports = {
    Personas: function () {

        const sqlite3 = require('sqlite3').verbose();
        var _db = new sqlite3.Database('./data/data.db');
        
        var listeners = {readyListeners: []};
        
        this.addReadyListener = function (listener){
            listeners.readyListeners[listeners.readyListeners.length] = listener;
        }
        
        function _notifyReady(data){
            for (var i = 0; i < listeners.readyListeners.length; i++) {
                listeners.readyListeners[i].listen(data);
            }
        }
        
        this.notifyReady = _notifyReady;

        this.list = function () {
            var sql = "SELECT nit,nombre FROM persona";
            _db.all(sql, [], function(err, rows) {
                if (err) {
                    return console.error(err.message);
                }
                resultlist = [];
                for (var i = 0; i < rows.length; i++) {
                    row = rows[i];
                    resultlist[resultlist.length] = new mPersona.Persona(row.nombre, row.nit);
                }
                _notifyReady(resultlist);
            });
        };

        this.get = function (nit) {
            var sql = "SELECT nit,nombre FROM persona WHERE nit = ?";
            _db.get(sql, [nit], function(err, row) {
                if (err) {
                    return console.error(err.message);
                }
                result = (row
                    ? new mPersona.Persona(row.nombre, row.nit)
                    : {});
                _notifyReady(result);

            });
        };

        this.save = function (persona) {
            if(!(persona instanceof mPersona.Persona)) {
                return false;
            }
            var stmt = _db.prepare("INSERT OR IGNORE INTO persona VALUES (?,?)");
            stmt.run(persona.nit, persona.nombre);
            stmt.finalize();
            return true;
        };

        this.delete = function (nit) {

        };

        Object.freeze(this);
    }
}


