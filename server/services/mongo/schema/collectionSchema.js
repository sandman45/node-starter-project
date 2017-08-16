const logger = require('');
const mongoose = require('mongoose');

const collection = 'collection_here';
const Schema = mongoose.Schema;
const schema = {};
const intentSchema = mongoose.Schema(schema);
const Intent = mongoose.model(collection, intentSchema);

module.exports = {
    insertIntent: (requestId, body) => {
        return new Promise((resolve, reject) => {
            logger.info(requestId, `[MONGO] - ${collection} - ${JSON.stringify(body)}`);
            const intent = new Intent(body);
            intent.save((err, doc) => {
                if (err) {
                    logger.error(null, err);
                    reject(err);
                } else {
                    logger.info(requestId, `[MONGO] - ${collection} - ${JSON.stringify(doc)}`);
                    resolve(doc);
                }
            });
        });
    },
};
