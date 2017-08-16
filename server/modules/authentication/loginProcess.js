
const loginModule = require('./loginModule');

/**
 * login
 * login process ldap, jwt token
 * @param username
 * @param password
 * @param requestId
 */
function login(username, password, requestId) {
    return loginModule.ldapAuthentication(username, password, requestId);
}

module.exports = {
    login,
};
