const please = require('../../../../server/services/mysql/sqlPlease');
const expect = require('chai').expect;
const sinon = require('sinon');
const fs = require('fs');

describe('sqlPlease', () => {
    describe('#loadQueries', () => {
        it('should read in sql files and return an object', () => {
            sinon.stub(fs, 'readdirSync', () => {
                return ['get-order.sql', 'get-all-orders.sql'];
            });

            sinon.stub(fs, 'readFileSync', () => {
                return 'SELECT * FROM ORDERS LIMIT 1';
            });

            sinon.stub(fs, 'statSync', () => {
                return {
                    isDirectory: () => false,
                    isFile: () => true,
                };
            });
            const queries = please.load('/server/services/mysql/sql');
            sinon.restore(fs, 'readdirSync');
            sinon.restore(fs, 'readFileSync');
            sinon.restore(fs, 'statSync');
            expect(queries).to.be.an('object');
            expect(queries.getOrder).to.exist;
            expect(queries.getAllOrders).to.exist;
        });
    });
});
