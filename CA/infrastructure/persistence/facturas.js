
const Factura = require('../../domain/factura.js');
const Persona = require('../../domain/persona.js');
const EstadosFactura = require('../../domain/enums/estados.js').EstadosFactura;
const Monedas = require('../../domain/enums/monedas.js').Monedas;
const Repository = require('../../domain/repository/repository.js');

class Facturas extends Repository {

    constructor() {
        super();
        const sqlite3 = require('sqlite3').verbose();
        this._db = new sqlite3.Database('./data/data.db');
    }

    list() {
        var sql = "SELECT f.facturaId, f.fecha, f.monto, f.moneda, p.nit AS personaId, p.nit, p.nombre, f.estado FROM factura as f INNER JOIN persona as p ON f.personaId = p.nit";
        this._db.all(sql, [], this._listFunction.bind(this));
    }

    _listFunction(err, rows) {
        if (err) {
            return console.error(err.message);
        }
        var resultlist = [];
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var persona = (new Persona())._loadFrom({"personaId": row.personaId, "nit": row.nit, "nombre": row.nombre});
            var moneda = row.moneda;
            var estado = row.estado;
            var fecha = new Date(row.fecha);

            resultlist[resultlist.length] = (new Factura())._loadFrom({"facturaId": row.facturaId, "persona": persona, "monto": row.monto, "moneda": moneda, "fecha": fecha, "estado": estado});
        }
        this.notifyReady(resultlist);
    }

    get(nit) {
        var sql = "SELECT f.facturaId, f.fecha, f.monto, f.moneda, p.nit AS personaId, p.nit, p.nombre, f.estado FROM factura as f INNER JOIN persona as p ON f.personaId = p.nit WHERE p.nit = ?";
        this._db.all(sql, [nit], this._getFunction.bind(this));
    }

    _getFunction(err, rows) {
        if (err) {
            return console.error(err.message);
        }
        var resultlist = [];
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var persona = (new Persona())._loadFrom({"personaId": row.personaId, "nit": row.nit, "nombre": row.nombre});
            var moneda = row.moneda;
            var estado = row.estado;
            var fecha = new Date(row.fecha);

            resultlist[resultlist.length] = (new Factura())._loadFrom({"facturaId": row.facturaId, "persona": persona, "monto": row.monto, "moneda": moneda, "fecha": fecha, "estado": estado});;
        }
        this.notifyReady(resultlist);
    }

    save(factura) {
        if (!(factura instanceof Factura)) {
            return false;
        }
        var stmt = this._db.prepare("INSERT INTO factura (fecha,estado,monto,moneda,personaId) VALUES (?,?,?,?,?)");
        stmt.run(factura.fecha, factura.estado, factura.monto.value, factura.moneda.value, factura.personaId);
        stmt.finalize();
        return this._db.lastInsertRowId;
    }
}

module.exports = {Facturas}
