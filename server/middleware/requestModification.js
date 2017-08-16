const util1 = require('../utilities/index').util1;

module.exports = {
    requestId: (req, res, next) => {
        req.requestId = util1.cuid();
        req.passData = {};
        next();
    },
};
