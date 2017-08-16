const logger = require('');
const MongoClient = require('mongoose');

MongoClient.Promise = global.Promise;

const config = require('../../config/config');

module.exports = {
    initialize: () => {
        logger.debug(null, `[MONGO] - uri: ${config.mongodb.uri}`);
        MongoClient.connect(config.mongodb.uri, { server: { autoReconnect: false } });

        MongoClient.connection.on('error', (err) => {
            logger.error(null, '', `[MONGO] Error-mongo --> serverjs --> Mongoose Connection Problem. Detail : ${err}`);
            MongoClient.disconnect();
        });

        MongoClient.connection.on('open', () => {
            logger.info(null, '[MONGO] serverjs --> MongoDB Connection Opened');
        });

        MongoClient.connection.on('close', () => {
            logger.info(null, '[MONGO] serverjs --> MongoDB Connection Closed');
        });

        MongoClient.connection.on('disconnected', () => {
            logger.error(null, '[MONGO] serverjs --> Disconnected from MongoDB');
        });

        MongoClient.connection.on('connected', () => {
            logger.info(null, '[MONGO] serverjs --> Successfully connected to MongoDB');
        });
    },
};
