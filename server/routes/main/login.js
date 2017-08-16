const logger = require('');

const apiRoutes = require('../../routes/routes');
const loginProcess = require('../../modules/authentication/loginProcess.js');

module.exports = (app) => {
    app.post(apiRoutes.login, (req, res, next) => {
        loginProcess.login(req.body.username, req.body.password, req.requestId).then((results) => {
            next(results);
        }).catch((error) => {
            logger.error(error.fid, error, error.message);
            next(error.error);
        });
    });
};
