const mFactura = require('../../domain/valueobjects/factura.js');
const Repository = require('../../domain/repository/repository.js');

class Facturas extends Repository {
    
    constructor() {
        super();
        const sqlite3 = require('sqlite3').verbose();
        this._db = new sqlite3.Database('./data/data.db');
    }

    list() {
        var sql = "SELECT f.fecha,m.nombre as moneda, f.monto , p.nit as NIT , p.nombre as Nombre , f.estado FROM factura as f INNER JOIN moneda as m ON f.monedaFK = m.id INNER JOIN persona as p ON f.personaFK = p.nit";
        this._db.all(sql, [], this._listFunction.bind(this));
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
        this.notifyReady(resultlist);
    }

    get(nit) {
        var sql = "SELECT f.fecha,m.nombre as moneda, f.monto , p.nit as NIT , p.nombre as Nombre , f.estado FROM factura as f INNER JOIN moneda as m ON f.monedaFK = m.id INNER JOIN persona as p ON f.personaFK = p.nit WHERE p.nit = ?";
        this._db.get(sql, [nit], this._getFunction.bind(this));
    }
    
    _getFunction(err, row) {
        if (err) {
            return console.error(err.message);
        }
        var result = (row
                ? new mPersona.Persona(row.nombre, row.nit)
                : {});
        this.notifyReady(result);
    }
    
    save(factura) {
        if (!(factura instanceof mPersona.Persona)) {
            return false;
        }
        var stmt = this._db.prepare("INSERT OR IGNORE INTO factura VALUES (?,?,?,?,?)");
        stmt.run(persona.nit, persona.nombre);
        stmt.finalize();
        return true;
    }
}

module.exports = {Facturas}
