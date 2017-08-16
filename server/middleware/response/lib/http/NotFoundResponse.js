/**
 * NotFoundResponse
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function NotFoundResponse(errorCode, moreInfo) {
    const response = {
        error: {
            code: errorCode,
            http_response_hint: 404,
            message: '',
            moreInfo,
        },
    };

    switch (errorCode) {
    case 104:
        response.error.message = 'Not Found: URI cannot be mapped.';
        break;
    case 404:
        response.error.message = 'Not Found: Unable to find the key for version.';
        break;
    default:
        response.error.message = 'Not Found: Default error.';
        break;
    }

    return response;
}

module.exports = NotFoundResponse;

