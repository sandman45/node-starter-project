const logger = require('');
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
        logger.debug(null, `[MYSQL] - Connected to - ${database} `);
        return conn.query(sql, values).then(results => results);
    });
}

module.exports = {
    executeQuery,
};
