const logger = global.logger;
const jwt = require('jsonwebtoken');

const config = require('../../config/config');
const cryptr = require('../../utilities/crypt');

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

    jwt.sign(jwtPayload, config.app.cryptoKey, jwtOptions, (err, token) => {
        resolve(token);
    });
});

module.exports.auth = (username, password) => module.exports.createJWTAccessToken(username, ['admin']);

/**
  * successLoginBody (Object)
  * creates the response body for a successfull login response
  * @param {Object} req
  * @return {Object} Promise
* */
module.exports.successLoginBody = req => new Promise((resolve) => {
    logger.debug('invoked: successLoginBody');

    const responseBody = {
        access_token: req.passData.token,
        roles: req.passData.rolesForFrontEnd,
    };

    resolve(responseBody);
});
