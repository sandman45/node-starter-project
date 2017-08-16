
const apiRoutes = require('../../routes/routes');

module.exports = (app) => {
    app.get(apiRoutes.health, (req, res, next) => {
        next('health ok');
    });
};
