const db = require('./database');

module.exports = {
    AddWifisBulk: async function(wifiList) {
        try {
            const result = await db.query('INSERT INTO wifi (inst_loc, inst_loc_detail, provider, inst_addr, latitude, longitude) VALUES ?', [wifiList]);
            return {result: result, error: null};
        } catch (error) {
            return {result: null, error: error};
        }
    },
    SearchWifisByProvider: async function(provider) {
        try {
            const result = await db.query('SELECT * FROM wifi where provider LIKE ?', [provider]);
            return {result: result, error: null};
        } catch (error) {
            return {result: null, error: error};
        }
    },
    GetAllWifis: async function() {
        try {
            const result = await db.query('SELECT * from wifi');
            return {result: result, error: null};
        } catch (error) {
            return {result: null, error: error};
        }
    },
}