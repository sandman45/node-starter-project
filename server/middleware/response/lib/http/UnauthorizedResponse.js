/**
 * UnauthorizedResponse
 * @param errorCode
 * @param moreInfo
 * @constructor
 */
function UnauthorizedResponse(errorCode, moreInfo) {
    const response = {
        error: {
            code: errorCode,
            http_response_hint: 401,
            message: '',
            moreInfo,
        },
    };

    switch (errorCode) {
    case 101:
        response.error.message = 'Unauthorized: Credentials did not match.';
        break;
    case 111:
        response.error.message = 'Unauthorized: Failed to authenticate Token.';
        break;
    case 112:
        response.error.message = 'Unauthorized: Authentication Scheme not provided.';
        break;
    case 113:
        response.error.message = 'Unauthorized: Authentication Token not provided.';
        break;
    case 114:
        response.error.message = 'Unauthorized: User Roles not provided.';
        break;
    default:
        response.error.message = 'Unauthorized: Default error.';
        break;
    }

    return response;
}

module.exports = UnauthorizedResponse;
