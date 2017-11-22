const expect = require('chai').expect;
const sinon = require('sinon');

describe('aws', () => {
    const AWS = require('aws-sdk');
    global.logger = require('winston');

    describe('#getS3', () => {
        it('should initialized the AWS object and return s3 object', () => {
            sinon.stub(AWS);
            sinon.stub(global.logger);
            const s3 = require('../../../server/services/aws');
            const thisS3 = s3.getS3();

            expect(thisS3).to.be.an('object');
            sinon.restore(AWS);
            sinon.restore(global.logger);
        });
    });
});
