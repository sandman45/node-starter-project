const requestModification = require('./requestModification');
const authentication = require('./security/auth');
const accessControl = require('./accessControl');
const response = require('./response/response');

module.exports = {
    requestModification,
    authentication,
    response,
    accessControl,
};
