
const logger = global.logger;

const queries = require('../../services/mysql/sqlPlease').load('/server/services/mysql/sql');

const mysql = require('../../services/mysql/index').query;

const sql = queries.example;
const values = ['1'];

module.exports.test3 = (testParam) => {
    const testVal = `TEST ROUTE 3: ${testParam}`;
    logger.debug(testVal);
    return mysql.executeQuery('database', sql, values);
};

module.exports.test4 = (testParam) => {
    const testVal = `TEST ROUTE 4: ${testParam}`;
    logger.debug(testVal);
    return mysql.executeQuery('database', sql, values);
};
