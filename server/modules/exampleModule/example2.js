
const logger = require('');

const queries = require('../../services/mysql/sqlplease').load('/server/services/mysql/sql');

const mysql = require('../../services/mysql/index').query;

const id = '56d616f6120353ff06688a19';
const sql = queries.getOrders;
const sql2 = queries.getAllOrders;
const values = [id];

function test3(testParam) {
    const testVal = `TEST ROUTE: ${testParam}`;
    logger.debug(testVal);
    return mysql.executeQuery('logistics', sql, values);
}

function test4(testParam) {
    const testVal = `TEST ROUTE: ${testParam}`;
    logger.debug(testVal);
    return mysql.executeQuery('logistics', sql2);
}

module.exports = {
    test3,
    test4,
};
