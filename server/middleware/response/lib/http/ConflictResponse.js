/**
 * ConflictResponse
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function ConflictResponse(errorCode, moreInfo) {
    const response = {
        error: {
            code: errorCode,
            http_response_hint: 409,
            message: '',
            moreInfo,
        },
    };

    switch (errorCode) {
    case 501:
        response.error.message = 'Conflict: Unable to resolve the conflict, please resubmit the request.';
        break;
    default:
        response.error.message = 'Conflict: Default error.';
        break;
    }

    return response;
}

module.exports = ConflictResponse;
