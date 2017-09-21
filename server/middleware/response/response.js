const _ = require('lodash');

module.exports = function (results, req, res, next) {
    if (_.has(results, 'error')) {
        res.status(results.error.code).send(results);
    } else {
        res.status(200).send(results);
    }
};

