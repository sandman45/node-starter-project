/**
 * MethodNotAllowedResponse
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function MethodNotAllowedResponse(errorCode, moreInfo) {
    return {
        error: {
            code: errorCode,
            http_response_code: 405,
            message: '',
            moreInfo,
        },
    };
}

module.exports = MethodNotAllowedResponse;

