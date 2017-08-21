/**
 * ConflictResponse
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function ConflictResponse(errorCode, moreInfo) {
    return {
        error: {
            code: errorCode,
            http_response_code: 409,
            message: '',
            moreInfo,
        },
    };
}

module.exports = ConflictResponse;
