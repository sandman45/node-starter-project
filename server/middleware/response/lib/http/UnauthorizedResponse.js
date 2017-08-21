/**
 * UnauthorizedResponse
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function UnauthorizedResponse(errorCode, moreInfo) {
    return {
        error: {
            code: errorCode,
            http_response_code: 401,
            message: '',
            moreInfo,
        },
    };
}

module.exports = UnauthorizedResponse;
