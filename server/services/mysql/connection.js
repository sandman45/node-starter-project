const logger = require('');
const mysql = require('promise-mysql');

const config = require('../../config/config');

const databases = {
    logistics: {
        pool: null,
    },
};

/**
 * initialize
 */
function initialize() {
    logger.debug(null, '[MYSQL] - Database connection pool initialized.');
    databases.logistics.pool = mysql.createPool({
        host: config.mysql.logistics.host,
        user: config.mysql.logistics.user,
        password: config.mysql.logistics.password,
        database: config.mysql.logistics.database,
        port: config.mysql.logistics.port,
        connectionLimit: config.mysql.logistics.connectionLimit,
        waitForConnections: true,
    });
}

/**
 *getSqlConnection
 * @param db
 */
function getSqlConnection(db) {
    return databases[db].pool.getConnection().disposer((connection) => {
        databases[db].pool.releaseConnection(connection);
        logger.debug(null, '[MYSQL] - Connection released.');
    });
}

module.exports = {
    initialize,
    connection: getSqlConnection,
};
