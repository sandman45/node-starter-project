/**
 * BadRequestResponse
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function BadRequestResponse(errorCode, moreInfo) {
    return {
        error: {
            code: errorCode,
            http_response_code: 400,
            message: '',
            moreInfo,
        },
    };
}

module.exports = BadRequestResponse;
