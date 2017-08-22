
const loginModule = require('./loginModule');

/**
 * login
 * login process auth, jwt token
 * @param username
 * @param password
 */
function login(username, password) {
    return loginModule.auth(username, password);
}

module.exports = {
    login,
};
