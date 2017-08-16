
const jwt = require('jsonwebtoken');
const async = require('async');
const logger = require('');
const _ = require('lodash');

const errorTypes = require('../response/lib/errorIndex');

const config = require('../../config/config');
const cryptr = require('../../utilities/crypt');

const acl = require('./acl');

/**
 * authenticateToken
 * authenticates the JWT token
 * @param req
 * @returns {Promise}
 */
function authenticateToken(req) {
    return new Promise((resolve, reject) => {
        const fid = {
            requestId: req.requestId,
            handler: 'authCheck',
            functionName: 'authenticateToken',
        };

        logger.debug(fid.requestId, 'authenticateToken: invoked');

        const token = req.headers.authorization;
        // check for Bearer authentication scheme
        const hasScheme = token.search('Bearer');

        if (token && hasScheme === 0) {
            logger.debug(fid.requestId, `token is: ${token}`);
            const checkToken = token.replace('Bearer ', '');
            jwt.verify(checkToken, config.app.cryptoKey, (err, decoded) => {
                if (err) {
                    switch (err.name) {
                    case 'TokenExpiredError':
                            // alertLogicLogger.token(req, 'CHARGEBACK_TOKEN_AUTHENTICATION_FAILURE_EXPIRED_CREDENTIALS',token);
                        break;
                    case 'JsonWebTokenError':
                            // alertLogicLogger.token(req, 'CHARGEBACK_TOKEN_AUTHENTICATION_FAILURE_CREDENTIAL_MISMATCH',token);
                        break;
                    default:
                        break;
                    }

                    logger.debug(fid.requestId, 'Failed to authenticate token', err);

                    const errorResponse = new errorTypes.UnauthorizedResponse(111, '');
                    reject(errorResponse);
                } else {
                    const decryptedData = JSON.parse(cryptr.decrypt(decoded.token));

                    req.authInfo = {
                        token,
                        tokenData: decryptedData,
                        username: decryptedData.username,
                        roles: decryptedData.roles,
                        exp: decoded.exp,
                        iat: decoded.iat,
                    };

                    resolve(req);
                }
            });
        } else {
            if (hasScheme !== 0) {
                logger.warn(fid.requestId, 'Missing Bearer Authentication Scheme', token);
                const errorResponse = new errorTypes.UnauthorizedResponse(112, '');
                reject(errorResponse);
            }
            logger.warn(fid.requestId, 'There is no token', token);
            const errorResponse = new errorTypes.UnauthorizedResponse(113, '');
            reject(errorResponse);
        }
    });
}

/**
 * applicationAuthorization
 * checks user to see if they are authorized to access this application
 * @param req
 * @returns {Promise}
 */
function applicationAuthorization(req) {
    return new Promise((resolve, reject) => {
        const fid = {
            requestId: req.requestId,
            handler: 'authCheck',
            functionName: 'applicationAuthorization',
        };

        logger.debug(fid.requestId, 'invoked');

        const userAppRoles = [];

        async.map(config.app.roles, (role, callback) => {
            if (req.authInfo.roles.indexOf(role) > -1) {
                userAppRoles.push(role.replace(config.app.role_prefix, ''));
                callback(null, true);
            } else {
                callback(null, false);
            }
        }, () => {
            if (userAppRoles.length > 0) {
                req.authInfo.roles = userAppRoles;
                resolve(req);
            } else {
                logger.debug(fid.requestId, 'Required application roles not available. Invalid User Roles');
                const errorResponse = new errorTypes.UnauthorizedResponse(114, '');
                reject(errorResponse);
            }
        });
    });
}

/**
 * endpointAuthorization
 * checks Endpoints associated with user roles
 * @param req
 * @returns {Promise}
 */
function endpointAuthorization(req) {
    return new Promise((resolve, reject) => {
        const fid = {
            requestId: req.requestId,
            handler: 'authCheck',
            functionName: 'endpointAuthorization',
        };

        logger.debug(fid.requestId, 'invoked');

        const path = req.path;
        const rest = req.method;

        const authorizedEndpointRoles = [];

        async.map(req.authInfo.roles, (role, callback) => {
            if (acl[role] && acl[role][rest]) {
                if (acl[role][rest].indexOf(path) > -1) {
                    authorizedEndpointRoles.push(role);
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            } else {
                callback(null, false);
            }
        }, () => {
            if (authorizedEndpointRoles.length > 0) {
                req.authInfo.authorizedEndpointRoles = authorizedEndpointRoles;
                resolve(req);
            } else {
                logger.debug(fid.requestId, 'Required application roles not available. Invalid User Roles');
                const errorResponse = new errorTypes.UnauthorizedResponse(111, '');
                reject(errorResponse);
            }
        });
    });
}

/**
 * authCheck
 * Full authentication
 * @param req
 * @param res
 * @param next
 */
module.exports.authCheck = (req, res, next) => {
    const fid = {
        requestId: req.requestId,
        handler: 'authCheck',
        functionName: 'authCheck',
    };

    logger.debug(fid.requestId, 'authCheck: invoked');

    authenticateToken(req)
    .then(applicationAuthorization)
    .then(endpointAuthorization)
    .then(() => {
        logger.debug(fid.requestId, `User: ${req.authInfo.username}, authCheck: successfully authorized.`);
        req.username = req.authInfo.username;
        next();
    })
    .catch((err) => {
        logger.error(fid.requestId, err);
        if (err && err.res && err.res.status && err.res.send) {
            res.status(err.error.http_response_hint).send(err);
        } else {
            const errorResponse = new errorTypes.InternalServerErrorResponse(500, 'Problem performing auth check');
            res.status(errorResponse.error.http_response_hint).send(errorResponse);
        }
    });
};

/**
 * isLoggedIn
 * Validate the Token only
 * @param req
 * @param res
 * @param next
 */
module.exports.isLoggedIn = (req, res, next) => {
    const fid = {
        requestId: req.requestId,
        handler: 'isLoggedIn',
        functionName: 'isLoggedIn',
    };

    logger.debug(fid.requestId, 'isLoggedIn: invoked');

    authenticateToken(req).then(() => {
        logger.info(fid.requestId, `User: ${req.authInfo.username}, isLoggedIn: successfully authorized.`);
        req.username = req.authInfo.username;
        next();
    })
    .catch((err) => {
        logger.error(fid.requestId, err);
        if (err && err.res && err.res.status && err.res.send) {
            res.status(err.res.status).send(err.res.send);
        } else {
            const errorResponse = new errorTypes.InternalServerErrorResponse(111, 'Unauthorized');
            res.status(errorResponse.error.http_response_hint).send(errorResponse);
        }
    });
};
