/**
 * ServiceUnavailableResponse
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function ServiceUnavailableResponse(errorCode, moreInfo) {
    const response = {
        error: {
            code: errorCode,
            http_response_hint: 503,
            message: '',
            moreInfo,
        },
    };

    switch (errorCode) {
    case 106:
        response.error.message = 'Service Unavailable: Failed to check service health.';
        break;
    case 107:
        response.error.message = 'Service Unavailable: Undergoing Temporary Maintenance.';
        break;
    default:
        response.error.message = 'Service Unavailable: Default error.';
        break;
    }

    return response;
}

module.exports = ServiceUnavailableResponse;
