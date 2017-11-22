
const AWS = require('aws-sdk');

const logger = global.logger;

const config = require('config');

let s3 = null;

/**
 * init
 * initializes the connection to the AWS S3 bucket
 */
function init() {
    logger.info(null, '[AWS] init --> Initializing AWS S3 connection');
    AWS.config.update({
        accessKeyId: config.aws.s3.accessKeyId,
        secretAccessKey: config.aws.s3.secretAccessKey,
    });

    s3 = new AWS.S3();
}

init();

/**
 * getS3
 * returns the AWS S3 connection and returns it to the calling function. If the connection is undefined or null re-initializes the connection.
 * @returns {*}
 */
module.exports.getS3 = function () {
    if (s3 === undefined || s3 === null) {
        logger.info(null, '[AWS] getS3 --> AWS S3 was undefined or null. Re-initializing AWS S3 connection.');

        AWS.config.update({
            accessKeyId: config.aws.s3.accessKeyId,
            secretAccessKey: config.aws.s3.secretAccessKey,
        });

        s3 = new AWS.S3();

        return s3;
    }
    return s3;
};
