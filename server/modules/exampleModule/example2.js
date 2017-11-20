
const logger = global.logger;
const config = require('config');

const queries = require('../../services/mysql/sqlPlease').load('/server/services/mysql/sql');

const mysql = require('../../services/mysql/index').query;

const sql = queries.example;
const values = [{ id: 'a0a9529d9f0d11e7af9bdeadbe483c96' }];

module.exports.test3 = (testParam) => {
    const testVal = `TEST ROUTE 3: ${testParam}`;
    logger.info(testVal);
    return mysql.executeQuery(config.mysql.database.database, sql, values);
};

module.exports.test4 = (testParam) => {
    const testVal = `TEST ROUTE 4: ${testParam}`;
    logger.info(testVal);
    return mysql.executeQuery(config.mysql.database.database, sql, values);
};
