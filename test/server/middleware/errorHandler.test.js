
const assert = require('assert');
const errorIndex = require('../../../server/middleware/response/lib/errorIndex');

describe('errorHandler', () => {
    describe('All', () => {
        it('should be Bad Request Message', () => {
            const errorHBR = new errorIndex.BadRequestResponse(103);
            console.info(`Error Code: ${errorHBR.error.code} - Hint: ${errorHBR.error.http_response_code}`);
            console.info(`Message: ${errorHBR.error.message}\n`);
            assert.equal(errorHBR.error.http_response_code, 400);
        });

        it('should be Conflict Message', () => {
            const errorHC = new errorIndex.ConflictResponse(501);
            console.info(`Error Code: ${errorHC.error.code} - Hint: ${errorHC.error.http_response_code}`);
            console.info(`Message: ${errorHC.error.message}\n`);
            assert.equal(errorHC.error.http_response_code, 409);
        });

        it('should be Forbidden Message', () => {
            const errorHF = new errorIndex.ForbiddenResponse(502);
            console.info(`Error Code: ${errorHF.error.code} - Hint: ${errorHF.error.http_response_code}`);
            console.info(`Message: ${errorHF.error.message}\n`);
            assert.equal(errorHF.error.http_response_code, 403);
        });

        it('should be Internal Server Error Message', () => {
            const errorHIS = new errorIndex.InternalServerErrorResponse(105);
            console.info(`Error Code: ${errorHIS.error.code} - Hint: ${errorHIS.error.http_response_code}`);
            console.info(`Message: ${errorHIS.error.message}\n`);
            assert.equal(errorHIS.error.http_response_code, 500);
        });

        it('should be Method Not Allowed Message', () => {
            const errorHMNA = new errorIndex.MethodNotAllowedResponse(503);
            console.info(`Error Code: ${errorHMNA.error.code} - Hint: ${errorHMNA.error.http_response_code}`);
            console.info(`Message: ${errorHMNA.error.message}\n`);
            assert.equal(errorHMNA.error.http_response_code, 405);
        });

        it('should be Not Found Message', () => {
            const errorHNF = new errorIndex.NotFoundResponse(104);
            console.info(`Error Code: ${errorHNF.error.code} - Hint: ${errorHNF.error.http_response_code}`);
            console.info(`Message: ${errorHNF.error.message}\n`);
            assert.equal(errorHNF.error.http_response_code, 404);
        });

        it('should be Service Unavailable Message', () => {
            const errorHSU = new errorIndex.ServiceUnavailableResponse(106);
            console.info(`Error Code: ${errorHSU.error.code} - Hint: ${errorHSU.error.http_response_code}`);
            console.info(`Message: ${errorHSU.error.message}\n`);
            assert.equal(errorHSU.error.http_response_code, 503);
        });

        it('should be Unauthorized Message', () => {
            const errorHU = new errorIndex.UnauthorizedResponse(101);
            console.info(`Error Code: ${errorHU.error.code} - Hint: ${errorHU.error.http_response_code}`);
            console.info(`Message: ${errorHU.error.message}\n`);
            assert.equal(errorHU.error.http_response_code, 401);
        });
    });
});

