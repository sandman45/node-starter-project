const expect = require('chai').expect;
const middleware = require('../../../server/middleware/requestModification');

describe('requestModification', () => {
    describe('#requestId', () => {
        it('should return and object with requestId', () => {
            const req = {

            };
            const res = {

            };
            const next = () => {};

            middleware.requestId(req, res, next);

            expect(req).to.exist;
            expect(req.requestId).to.exist;
            expect(req.passData).to.exist;
        });
    });
});
