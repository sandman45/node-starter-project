
const jwt = require('jsonwebtoken');
const async = require('async');

const errorTypes = require('../response/lib/errorIndex');

const config = require('config');
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
        global.logger.info('authenticateToken: invoked');

        const token = req.headers.authorization;
        // check for Bearer authentication scheme
        if (token !== undefined && token !== null) {
            const hasScheme = token.search('Bearer');

            if (token && hasScheme === 0) {
                global.logger.info(`token is: ${token}`);
                const checkToken = token.replace('Bearer ', '');
                jwt.verify(checkToken, config.cryptoKey, (err, decoded) => {
                    if (err) {
                        switch (err.name) {
                        case 'TokenExpiredError':
                            break;
                        case 'JsonWebTokenError':
                            break;
                        default:
                            break;
                        }

                        global.logger.info('Failed to authenticate token');

                        const errorResponse = new errorTypes.UnauthorizedResponse(111, 'Failed to authenticate token');
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
                    global.logger.warn('Missing Bearer Authentication Scheme');
                    const errorResponse = new errorTypes.UnauthorizedResponse(112, 'Missing Bearer Authentication Scheme');
                    reject(errorResponse);
                }
                global.logger.warn('There is no token');
                const errorResponse = new errorTypes.UnauthorizedResponse(113, 'There is no token');
                reject(errorResponse);
            }
        } else {
            global.logger.warn('There is no token');
            const errorResponse = new errorTypes.UnauthorizedResponse(113, 'There is no token');
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
        global.logger.info('invoked');

        const userAppRoles = [];

        async.map(config.roles, (role, callback) => {
            if (req.authInfo.roles.indexOf(role) > -1) {
                userAppRoles.push(role.replace(config.role_prefix, ''));
                callback(null, true);
            } else {
                callback(null, false);
            }
        }, () => {
            if (userAppRoles.length > 0) {
                req.authInfo.roles = userAppRoles;
                resolve(req);
            } else {
                global.logger.info('Required application roles not available. Invalid User Roles');
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
        global.logger.info('invoked');

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
                global.logger.info('Required application roles not available. Invalid User Roles');
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
    global.logger.info('authCheck: invoked');

    authenticateToken(req)
    .then(applicationAuthorization)
    .then(endpointAuthorization)
    .then(() => {
        global.logger.info(`User: ${req.authInfo.username}, authCheck: successfully authorized.`);
        req.username = req.authInfo.username;
        next();
    })
    .catch((err) => {
        global.logger.error(err);
        res.status(err.error.http_response_code).send(err);
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
    global.logger.info('isLoggedIn: invoked');

    authenticateToken(req).then(() => {
        global.logger.info(`User: ${req.authInfo.username}, isLoggedIn: successfully authorized.`);
        req.username = req.authInfo.username;
        next();
    })
    .catch((err) => {
        global.logger.error(err);
        if (err && err.res && err.res.status && err.res.send) {
            res.status(err.res.status).send(err.res.send);
        } else {
            const errorResponse = new errorTypes.InternalServerErrorResponse(111, 'Unauthorized');
            res.status(errorResponse.error.http_response_code).send(errorResponse);
        }
    });
};
