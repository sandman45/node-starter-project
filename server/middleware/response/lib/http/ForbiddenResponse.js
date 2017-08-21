/**
 * ForbiddenResponse
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function ForbiddenResponse(errorCode, moreInfo) {
    return {
        error: {
            code: errorCode,
            http_response_code: 403,
            message: '',
            moreInfo,
        },
    };
}

module.exports = ForbiddenResponse;
