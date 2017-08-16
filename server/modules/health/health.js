
const logger = require('@clip/node.logger');

function checkHealth(req, res) {
    logger.info('Health Check');
    res.send('Health Check');
}

// TODO deep health check, check DB etc.

module.exports = {
    checkHealth,
};
