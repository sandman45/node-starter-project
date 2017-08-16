
const expect = require('chai').expect;
const sinon = require('sinon');
const events = require('events');

const eventEmitter = new events.EventEmitter();

describe('ldap', () => {
    const ldap = require('ldapjs');
    const ldapUtil = require('../../../server/services/ldap');

    describe('#ldapLogin', () => {
        it('should login with LDAP', () => {
            sinon.stub(ldap, 'createClient', () => ({
                bind: (authUser, authPass, callback) => {
                    callback(null);
                },
                unbind: (callback) => {
                    callback(null);
                },
                search: (authUser, opts, callback) => {
                    callback(null, eventEmitter);
                    eventEmitter.emit('end');
                },
            }));

            ldapUtil.ldapLogin('application', 'applicationUid', 'applicationPassword', 'authenticateUser', 'authenticateUserPassword', (err, results) => {
                expect(results).to.be.an('object');
                expect(results.roles).to.be.an('array');
                expect(results.roles.length).to.equal(0);
                sinon.restore(ldap);
            });
        });

        it('should error on bind ', () => {
            sinon.stub(ldap, 'createClient', () => ({
                bind: (authUser, authPass, callback) => {
                    callback('error');
                },
                unbind: (callback) => {
                    callback(null);
                },
                search: (authUser, opts, callback) => {
                    callback(null, eventEmitter);
                    eventEmitter.emit('end');
                },
            }));

            ldapUtil.ldapLogin('application', 'applicationUid', 'applicationPassword', 'authenticateUser', 'authenticateUserPassword', (err, results) => {
                expect(err).to.equal('INVALID_USER_CREDENTIAL');
                sinon.restore(ldap);
            });
        });

        it('should error on unbind ', () => {
            sinon.stub(ldap, 'createClient', () => ({
                bind: (authUser, authPass, callback) => {
                    callback(null);
                },
                unbind: (callback) => {
                    callback('error');
                },
                search: (authUser, opts, callback) => {
                    callback(null, eventEmitter);
                    eventEmitter.emit('end');
                },
            }));

            ldapUtil.ldapLogin('application', 'applicationUid', 'applicationPassword', 'authenticateUser', 'authenticateUserPassword', (err, results) => {
                expect(err).to.equal('INVALID_USER_CREDENTIAL');
                sinon.restore(ldap);
            });
        });

        it('should error on search ', () => {
            sinon.stub(ldap, 'createClient', () => ({
                bind: (authUser, authPass, callback) => {
                    callback(null);
                },
                unbind: (callback) => {
                    callback(null);
                },
                search: (authUser, opts, callback) => {
                    callback('error', eventEmitter);
                    eventEmitter.emit('end');
                },
            }));

            ldapUtil.ldapLogin('application', 'applicationUid', 'applicationPassword', 'authenticateUser', 'authenticateUserPassword', (err, results) => {
                expect(err).to.equal('INVALID_USER_CREDENTIAL');
                sinon.restore(ldap);
            });
        });

        it('should return roles ', () => {
            sinon.stub(ldap, 'createClient', () => ({
                bind: (authUser, authPass, callback) => {
                    callback(null);
                },
                unbind: (callback) => {
                    callback(null);
                },
                search: (authUser, opts, callback) => {
                    callback(null, eventEmitter);
                    eventEmitter.emit('searchEntry', { object: { cn: 'hi' } });
                    // eventEmitter.emit('end');
                },
            }));

            ldapUtil.ldapLogin('application', 'applicationUid', 'applicationPassword', 'authenticateUser', 'authenticateUserPassword', (err, results) => {
                expect(results.roles[0]).to.equal('hi');
                sinon.restore(ldap);
            });
        });
    });
});
