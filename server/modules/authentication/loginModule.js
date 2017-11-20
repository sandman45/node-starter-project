const logger = global.logger;
const jwt = require('jsonwebtoken');

const config = require('config');
const cryptr = require('../../utilities/crypt');
const unauthorized = require('../../middleware/response/lib/errorIndex').UnauthorizedResponse;
const queries = require('../../services/mysql/sqlPlease').load('/server/services/mysql/sql');

const mysql = require('../../services/mysql/index').query;

const sql = queries.getUser;

/**
  * createJWTAccessToken (Object)
  * Create access token using JWT and return that as a part of the response.
  * @param {Object} username (request)
  * @param roles
  * @return {token} promise
* */
module.exports.createJWTAccessToken = (username, roles) => new Promise((resolve) => {
    const jwtObj = { username, roles };
    const jwtPayload = {
        token: cryptr.encrypt(JSON.stringify(jwtObj)),
    };
    const jwtOptions = {
        algorithm: config.jwt.algorithm,
        expiresIn: config.jwt.expiresIn,
    };

    jwt.sign(jwtPayload, config.cryptoKey, jwtOptions, (err, token) => {
        resolve(token);
    });
});

module.exports.auth = username => module.exports.createJWTAccessToken(username, ['Admin']);

/**
 * userAuth
 * @param username
 * @param pass
 */
module.exports.userAuth = (username, pass) =>
    mysql.executeQuery(config.mysql.database.database, sql, { email: username }).then((results) => {
        logger.info(`${username}: ${pass}`);
        logger.info(results);
        if (pass === results[0].password_hash) {
            return module.exports.createJWTAccessToken(username, ['Admin']);
        }
        const err = unauthorized(1, 'Unauthorized');
        return Promise.reject(err);
    });

/**
  * successLoginBody (Object)
  * creates the response body for a successfull login response
  * @param {Object} req
  * @return {Object} Promise
* */
module.exports.successLoginBody = req => new Promise((resolve) => {
    logger.debug('invoked: successLoginBody');

    const responseBody = {
        access_token: req.token,
        roles: req.rolesForFrontEnd,
    };

    resolve(responseBody);
});
