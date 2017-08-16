const config = require('../../config/config');

module.exports = (function (req, res, next) {
    const port = (config.app.port === '80' ? '' : (`:${config.app.port}`));

    res.header('Access-Control-Allow-Origin', config.app.host + port);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});
