
const loginModule = require('./loginModule');

/**
 * login
 * login process ldap, jwt token
 * @param username
 * @param password
 */
function login(username, password) {
    return loginModule.auth(username, password);
}

module.exports = {
    login,
};
