global.Promise = require('bluebird');

describe('query', () => {
    const query = require('../../../../server/services/mysql/query');
    const mysqlConn = require('../../../../server/services/mysql/connection');
    const logger = require('winston');

    const sinon = require('sinon');

    describe('#executeQuery', () => {
        it('should call connection successfully', () => {
            const results = ['1'];
            const connObject = {
                query: (sql, values) => Promise.resolve(results),
            };
            sinon.stub(logger);
            sinon.stub(mysqlConn, 'connection', () => {
                return connObject;
            });
            const db = 'database';
            const sql = 'SELECT 1 FROM DUAL';
            const values = ['val'];

            query.executeQuery(db, sql, values).then((res) => {
                sinon.assert.calledWith(mysqlConn.connection, db);
                sinon.assert.match(res,results);
                mysqlConn.connection.restore();
                sinon.restore(logger);
            });
        });
    });
});
