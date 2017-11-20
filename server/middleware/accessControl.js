const config = require('config');

module.exports = (function (req, res, next) {
    const port = (config.port === '80' ? '' : (`:${config.port}`));

    res.header('Access-Control-Allow-Origin', config.host + port);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});
