const logger = global.logger;
const mysqlConn = require('./connection');

/**
 * executeQuery
 * @param database
 * @param sql
 * @param values
 * @returns {Promise.<TResult>}
 */
function executeQuery(database, sql, values) {
    return Promise.using(mysqlConn.connection(database), (conn) => {
        logger.info(`[MYSQL] - Connected to - ${database} `);
        return conn.query(sql, values).then(results => results);
    });
}

module.exports = {
    executeQuery,
};
