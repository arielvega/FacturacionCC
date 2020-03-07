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
            resultlist[resultlist.length] = new mFactura.Factura(row.persona, row.monto , row.fecha, row.estado) ;
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
                ? new mFactura.Factura(row.persona, row.monto , row.fecha, row.estado)
                : {});
        this.notifyReady(result);
    }
    
    save(factura) {
        if (!(factura instanceof mFactura.Factura)) {
            return false;
        }
        var stmt = this._db.prepare("INSERT OR IGNORE INTO factura VALUES (?,?,?,?,?)");
        stmt.run(factura.fecha, factura.estado,factura.monto , factura.persona );
        stmt.finalize();
        return true;
    }
}

module.exports = {Facturas}
