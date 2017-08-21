
const logger = global.logger;

const queries = require('../../services/mysql/sqlPlease').load('/server/services/mysql/sql');

const mysql = require('../../services/mysql/index').query;

const sql = queries.example;

module.exports.test = (testParam) => {
    const testVal = `TEST ROUTE: ${testParam}`;
    logger.debug(testVal);
    return mysql.executeQuery('database', sql);
};