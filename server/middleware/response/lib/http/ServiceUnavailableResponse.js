/**
 * ServiceUnavailableResponse
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function ServiceUnavailableResponse(errorCode, moreInfo) {
    return {
        error: {
            code: errorCode,
            http_response_code: 503,
            message: '',
            moreInfo,
        },
    };
}

module.exports = ServiceUnavailableResponse;
