const mongo = require('./connection');
const intent = require('./schema/collectionSchema');
const payment = require('./schema/paymentHistory');
const ipn = require('./schema/ipnCollections');

module.exports = {
    init: mongo.initialize,
    intent,
    payment,
    ipn,
};
