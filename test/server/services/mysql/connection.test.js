global.Promise = require('bluebird');
global.logger = require('winston');

describe('connection', () => {
    const mysql = require('promise-mysql');
    const mysqlConn = require('../../../../server/services/mysql/connection');


    const sinon = require('sinon');

    describe('#initialize', () => {
        it('should call createPool', () => {
            sinon.stub(global.logger);
            sinon.stub(mysql, 'createPool');

            mysqlConn.initialize();

            sinon.assert.calledOnce(mysql.createPool);

            mysql.createPool.restore();
            sinon.restore(global.logger);
        });
    });

    describe('#connection', () => {
        it('should getSqlConnection from pool', () => {
            const cpResponse = () => ({
                getConnection: () => ({
                    disposer: () => Promise.resolve({ hi: 'hi' }),
                }),
                releaseConnection: () => {},
            });
            sinon.stub(mysql, 'createPool', cpResponse);
            sinon.stub(global.logger);
            mysqlConn.initialize();

            const db = 'lightsan_test_database';
            mysqlConn.connection(db).then((results) => {
                sinon.assert.match({ hi: 'hi' }, results);
                sinon.restore(global.logger);
                mysql.createPool.restore();
            });
        });
    });
});
