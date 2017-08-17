const logger = require('');
const jwt = require('jsonwebtoken');
const async = require('async');

const config = require('../../config/config');
const cryptr = require('../../utilities/crypt');
const ldap = require('../../services/ldap');

/**
  * bodyValidation (Object)
  * validate if required attributes are present
  * @param {Object}  req
  * @return {resolve} promise
**/
module.exports.bodyValidation = req => new Promise((resolve, reject) => {
    const fid = {
        requestId: req.requestId,
        handler: req.passData.handler,
        functionName: 'bodyValidation',
    };

    logger.debug(fid.requestId, 'invoked');

    if (typeof req.body.username === 'undefined' || typeof req.body.password === 'undefined') {
        reject({ error: { code: 103, message: 'Missing required parameters', fid: fid.requestId, type: 'debug', trace: null } });
    }

    if (req.body.username.trim() === '' || req.body.password === '') {
        logger.error(fid.requestId, '[LOGIN] - Required attribute cannot be empty');
        reject({ error: { code: 103, message: 'Required attribute cannot be empty.', fid: fid.requestId, type: 'debug', trace: null } });
    }
    req.passData.postBody = req.body;
    resolve(req);
});

/**
  * ldapAuthentication (Object)
  * validate with ldap that the username and password is correct
  * @param username
  * @param password
  * @param requestId
  * @return {resolve} promise
**/
module.exports.ldapAuthentication = (username, password, requestId) => new Promise((resolve, reject) => {
    logger.debug(requestId, 'invoked');
    ldap.ldapLogin(config.app.application, config.app.applicationUid, config.app.applicationPassword,
    username, password, (err, result) => {
        if (err) {
            if (err === 'INVALID_USER_CREDENTIAL') {
                logger.error(requestId, '[LOGIN] - INCORRECT_PASSWORD');
                reject({ error: { code: 101, message: 'Invalid Credential', fid: requestId, type: 'debug', trace: null } });
            } else if (err === 'INVALID_APPLICATION_CREDENTIAL') {
                reject({ error: { code: 102, message: 'Invalid Application Credential', fid: requestId, type: 'warn', trace: null } });
            } else {
                reject({ error: { code: 102, message: 'Unknown login problem', fid: requestId, type: 'warn', trace: null } });
            }
        } else if (result.roles.length > 0) {
            const rolesForToken = [];
            const rolesForFrontEnd = [];

            async.map(result.roles, (role, callback) => {
                if (config.app.roles.indexOf(role) > -1) {
                    rolesForToken.push(role);
                    rolesForFrontEnd.push(role.replace(config.app.role_prefix, '').toLowerCase());
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            }, (error, results) => {
                if (error) {
                    logger.error(requestId, error); // temporary
                    reject(error);
                }
                logger.info(requestId, results); // temporary
                if (rolesForToken.length > 0 &&
                  rolesForFrontEnd.length > 0 &&
                  rolesForToken.length === rolesForFrontEnd.length
                ) {
                    const successObj = {
                        access_token: this.createJWTAccessToken(username, rolesForToken),
                        roles: rolesForFrontEnd,
                    };
                    Promise.props(successObj).then((successResults) => {
                        logger.info(requestId, successResults);
                        resolve(successResults);
                    });
                } else {
                    reject({ error: { code: 101, message: 'Unauthorized', fid: requestId, type: 'debug', trace: null } });
                }
            });
        } else {
            reject({ error: { code: 101, message: 'Unauthorized', fid: requestId, type: 'debug', trace: null } });
        }
    });
});

/**
  * createJWTAccessToken (Object)
  * Create access token using JWT and return that as a part of the response.
  * @param {Object} username (request)
  * @param roles
  * @return {token} promise
**/
module.exports.createJWTAccessToken = (username, roles) => new Promise((resolve) => {
    const jwtObj = { username, roles };
    const jwtPayload = {
        token: cryptr.encrypt(JSON.stringify(jwtObj)),
    };
    const jwtOptions = {
        algorithm: config.jwt.algorithm,
        expiresIn: config.jwt.expiresIn,
    };

    jwt.sign(jwtPayload, config.app.cryptoKey, jwtOptions, (err, token) => {
        resolve(token);
    });
});

/**
  * successLoginBody (Object)
  * creates the response body for a successfull login response
  * @param {Object} req
  * @return {Object} Promise
**/
module.exports.successLoginBody = req => new Promise((resolve) => {
    const fid = {
        requestId: req.requestId,
        handler: req.passData.handler,
        functionName: 'successLoginBody',
    };

    logger.debug(fid, 'invoked');

    const responseBody = {
        access_token: req.passData.token,
        roles: req.passData.rolesForFrontEnd,
    };

    resolve(responseBody);
});
