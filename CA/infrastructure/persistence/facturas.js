const mFactura = require('../../domain/valueobjects/factura.js');
const mPersona = require('../../domain/valueobjects/persona.js');
const mEstado = require('../../domain/valueobjects/estado.js');
const mMoneda = require('../../domain/valueobjects/moneda.js');
const Repository = require('../../domain/repository/repository.js');

class Facturas extends Repository {

    constructor() {
        super();
        const sqlite3 = require('sqlite3').verbose();
        this._db = new sqlite3.Database('./data/data.db');
    }

    list() {
        var sql = "SELECT f.id, f.fecha, f.monto, f.moneda, p.nit as NIT , p.nombre as Nombre , f.estado FROM factura as f INNER JOIN persona as p ON f.personaFK = p.nit";
        this._db.all(sql, [], this._listFunction.bind(this));
    }

    _listFunction(err, rows) {
        if (err) {
            return console.error(err.message);
        }
        var resultlist = [];
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var persona = new mPersona.Persona(row.Nombre, row.NIT);
            var moneda = new mMoneda.Moneda(row.moneda);
            var estado = new mEstado.Estado(row.estado);
            var fecha = new Date(row.fecha);
            
            resultlist[resultlist.length] = new mFactura.Factura(persona, row.monto, moneda, fecha, estado);
        }
        this.notifyReady(resultlist);
    }

    get(nit) {
        var sql = "SELECT f.fecha, f.monto, f.moneda, p.nit as NIT , p.nombre as Nombre , f.estado FROM factura as f INNER JOIN persona as p ON f.personaFK = p.nit WHERE p.nit = ?";
        this._db.get(sql, [nit], this._getFunction.bind(this));
    }

    _getFunction(err, row) {
        if (err) {
            return console.error(err.message);
        }
        var result;
        if (row) {
            var persona = new mPersona.Persona(row.Nombre, row.NIT);
            var moneda = new mMoneda.Moneda(row.moneda);
            var estado = new mEstado.Estado(row.estado);
            var fecha = new Date(row.fecha);
            result = new mFactura.Factura(persona, row.monto, moneda, fecha, estado);
        } else {
            result = {};
        }
        this.notifyReady(result);
    }

    save(factura) {
        if (!(factura instanceof mFactura.Factura)) {
            return false;
        }
        var stmt = this._db.prepare("INSERT OR IGNORE INTO factura (fecha,estado,monto,moneda,personaFK) VALUES (?,?,?,?,?)");
        stmt.run(factura.fecha, factura.estado.nombre, factura.monto, factura.moneda.nombre, factura.persona.nit);
        stmt.finalize();
        return true;
    }
}

module.exports = {Facturas}
