const mysql = require('./connection');
const query = require('./query');

module.exports = {
    init: mysql.initialize,
    connection: mysql.connection,
    query,
};
