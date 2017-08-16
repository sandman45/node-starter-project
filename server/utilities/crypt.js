
const config = require('../config/config');

const encryptor = require('simple-encryptor')(config.app.cryptoKey);

module.exports.encrypt = value => encryptor.encrypt(value);

module.exports.decrypt = value => encryptor.decrypt(value);
