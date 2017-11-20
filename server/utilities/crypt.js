
const config = require('config');

const encryptor = require('simple-encryptor')(config.cryptoKey);

module.exports.encrypt = value => encryptor.encrypt(value);

module.exports.decrypt = value => encryptor.decrypt(value);
