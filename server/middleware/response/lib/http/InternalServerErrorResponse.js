/**
 * InternalServerErrorResponse
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function InternalServerErrorResponse(errorCode, moreInfo) {
    return {
        error: {
            code: errorCode,
            http_response_code: 500,
            message: '',
            moreInfo,

        },
    };
}

module.exports = InternalServerErrorResponse;
