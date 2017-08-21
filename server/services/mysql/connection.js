const logger = global.logger;
const mysql = require('promise-mysql');

const config = require('../../config/config');

const databases = {
    database: {
        pool: null,
    },
};

/**
 * initialize
 */
function initialize() {
    logger.debug(null, '[MYSQL] - Database connection pool initialized.');
    databases.database.pool = mysql.createPool({
        host: config.mysql.database.host,
        user: config.mysql.database.user,
        password: config.mysql.database.password,
        database: config.mysql.database.database,
        port: config.mysql.database.port,
        connectionLimit: config.mysql.database.connectionLimit,
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
