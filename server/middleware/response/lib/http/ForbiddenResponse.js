/**
 * ForbiddenResponse
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function ForbiddenResponse(errorCode, moreInfo) {
    const response = {
        error: {
            code: errorCode,
            http_response_hint: 403,
            message: '',
            moreInfo,
        },
    };

    switch (errorCode) {
    case 502:
        response.error.message = 'Forbidden: Not enough privileges to perform the requested operation.';
        break;
    default:
        response.error.message = 'Forbidden: Default error.';
        break;
    }

    return response;
}

module.exports = ForbiddenResponse;
