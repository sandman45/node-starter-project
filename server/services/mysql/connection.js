const logger = global.logger;
const mysql = require('promise-mysql');

const config = require('config');

const databases = {
    database: {
        pool: null,
    },
};

databases[config.mysql.database.database] = {
    pool: null,
};

/**
 * initialize
 */
function initialize() {
    logger.info('[MYSQL] - Database connection pool initialized.');
    databases[config.mysql.database.database].pool = mysql.createPool({
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
        logger.info('[MYSQL] - Connection released.');
    });
}

module.exports = {
    initialize,
    connection: getSqlConnection,
};
