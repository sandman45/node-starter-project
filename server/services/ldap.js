const ldap = require('ldapjs');

const ldapUrl = '';

/**
 * ldapAuthentication
 * authenticate user
 * @param application
 * @param authenticateUser
 * @param authenticatePassword
 * @param callback
 */
const ldapAuthentication = (application, authenticateUser, authenticatePassword, callback) => {
    try {
        const ldapAuthenticate = ldap.createClient({
            url: ldapUrl,
        });

        ldapAuthenticate.bind(`uid=${authenticateUser},ou=Users,o=56968beee9c810635e10692c,dc=jumpcloud,dc=com`, authenticatePassword, (err) => {
            if (err) {
                callback(err, false);
            } else {
                ldapAuthenticate.unbind((err1) => {
                    if (err1) {
                        callback(err1, true);
                    } else {
                        callback(null, true);
                    }
                });
            }
        });
    } catch (e) {
        callback(e, false);
    }
};

/**
 * searchForUserOnLdap
 * @param ldapAuthorization
 * @param opts
 * @param callbackSearch
 */
const searchForUserOnLdap = (ldapAuthorization, opts, callbackSearch) => {
    ldapAuthorization.search('ou=Users,o=56968beee9c810635e10692c,dc=jumpcloud,dc=com', opts, (err1, authorizationResponse) => {
        if (err1) {
            ldapAuthorization.unbind((errAuthorizeUnbind) => {
                callbackSearch(err1, []);
            });
        } else {
            const roles = [];

            authorizationResponse.on('searchEntry', (entry) => {
                try {
                    roles.push(entry.object.cn);
                } catch (e) {
          // no need to do anything. This is expected.
                }
            });

            authorizationResponse.on('end', (result) => {
                ldapAuthorization.unbind((errAuthorizeUnbind) => {
                    if (err1) {
                        callbackSearch(err1, roles);
                    } else {
                        callbackSearch(null, roles);
                    }
                });
            });
        }
    });
};

/**
 * getUserRolesFromLdap
 * Retrieve the users roles and other information
 * @param application
 * @param applicationUid
 * @param applicationPassword
 * @param searchUser
 * @param callback
 */
const getUserRolesFromLdap = (application, applicationUid, applicationPassword, searchUser, callback) => {
    try {
        const ldapAuthorization = ldap.createClient({
            url: ldapUrl,
        });

        ldapAuthorization.bind(`uid=${applicationUid},ou=Users,o=56968beee9c810635e10692c,dc=jumpcloud,dc=com`, applicationPassword, (err) => {
            if (err) {
                callback(err, []);
            } else {
                const opts = {
                    filter: `(&(objectClass=groupOfNames)(member=uid=${searchUser},ou=Users,o=56968beee9c810635e10692c,dc=jumpcloud,dc=com))`,
                    scope: 'sub',
                    attributes: ['cn'],
                };

                searchForUserOnLdap(ldapAuthorization, opts, (error, roles) => {
                    if (error) {
                        callback(error, roles);
                    } else {
                        callback(null, roles);
                    }
                });
            }
        });
    } catch (e) {
        callback(e, []);
    }
};

/**
 * ldapLogin
 * Check if the user credentials are right and if it is get the roles
 * @param application
 * @param applicationUid
 * @param applicationPassword
 * @param authenticateUser
 * @param authenticateUserPassword
 * @param callback
 * return --> 1) callback('INVALID_USER_CREDENTIAL',null)
 *            2) callback('INVALID_APPLICATION_CREDENTIAL',null)
 *            3) callback(null,{'roles':[]})
 */
module.exports.ldapLogin = (application, applicationUid, applicationPassword, authenticateUser,
                            authenticateUserPassword, callback) => {
    ldapAuthentication(application, authenticateUser, authenticateUserPassword, (errAuthenticate, approval) => {
        if (approval) {
            getUserRolesFromLdap(application, applicationUid, applicationPassword, authenticateUser,
                (errGetRoles, userRoles) => {
                    if (errGetRoles) {
                        callback('INVALID_APPLICATION_CREDENTIAL', null);
                    } else {
                        callback(null, { roles: userRoles });
                    }
                });
        } else {
            callback('INVALID_USER_CREDENTIAL', null);
        }
    });
};
