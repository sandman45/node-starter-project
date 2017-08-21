/**
 * NotFoundResponse
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function NotFoundResponse(errorCode, moreInfo) {
    return {
        error: {
            code: errorCode,
            http_response_code: 404,
            message: '',
            moreInfo,
        },
    };
}

module.exports = NotFoundResponse;

