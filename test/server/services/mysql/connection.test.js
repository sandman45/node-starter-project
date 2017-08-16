global.Promise = require('bluebird');

describe('connection', () => {
    const mysql = require('promise-mysql');
    const mysqlConn = require('../../../../server/services/mysql/connection');
    const logger = require('');

    const sinon = require('sinon');

    describe('#initialize', () => {
        it('should call createPool', () => {
            sinon.stub(logger);
            sinon.stub(mysql, 'createPool');

            mysqlConn.initialize();

            sinon.assert.calledOnce(mysql.createPool);

            mysql.createPool.restore();
            sinon.restore(logger);
        });
    });

    describe('#connection', () => {
        it('should getSqlConnection from pool', () => {
            const cpResponse = () => {
                return {
                    getConnection: () => {
                        return {
                            disposer: () => Promise.resolve({ hi: 'hi' }),
                        };
                    },
                    releaseConnection: () => {},
                };
            };
            sinon.stub(mysql, 'createPool', cpResponse);
            sinon.stub(logger);
            mysqlConn.initialize();

            const db = 'logistics';
            mysqlConn.connection(db).then((results) => {
                sinon.assert.match({ hi: 'hi' }, results);
                sinon.restore(logger);
                mysql.createPool.restore();
            });
        });
    });
});
