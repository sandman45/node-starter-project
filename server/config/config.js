
exports.environment = process.env.ENVIRONMENT;

exports.app = {
    application: 'Node Starter Project',
    applicationUid: process.env.APPLICATIONUID,
    applicationPassword: process.env.APPLICATIONPASSWORD,
    environment: process.env.ENVIRONMENT,
    port: process.env.PORT || 3000,
    host: process.env.host || 'http://127.0.0.1',
    cryptoKey: process.env.CRYPTOKEY,
    roles: ['Admin'],
    role_prefix: 'Dev_',
};

exports.jwt = {
    algorithm: 'HS256',
    expiresIn: '2 days',
};

exports.mysql = {
    query_timeout: process.env.QUERY_TIMEOUT || 300000,
    database: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT,
        connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || 6,
    },
};

exports.credentials = {
    aws: {
        s3: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            bucketDispute: process.env.AWS_BUCKET_DISPUTE,
            signedUrlExpireTime: process.env.AWS_SIGNED_URL_EXPIRE_TIME || 600,
        },
        s3_signature: {
            signatureAccessKeyId: process.env.S3_SIGNATURE_ACCESS_KEY_ID,
            SignatureSecretAccessKey: process.env.S3_SIGNATURE_SECRET_ACCESS_KEY,
            bucketSignature: process.env.AWS_BUCKET_SIGNATURE,
        },
    },
};
