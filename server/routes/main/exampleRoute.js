
const auth = require('../../../server/middleware/security/auth');
const apiRoutes = require('../../../server/routes/routes');
const routesVersioning = require('express-routes-versioning')();

const exampleModule = require('../../../server/modules/exampleModule/example');
const exampleModule2 = require('../../../server/modules/exampleModule/example2');

const errors = require('../../middleware/response/lib/errorIndex');

module.exports = (app) => {
    app.get(apiRoutes.test, (req, res, next) => {
        exampleModule.test('my awesome test route').then((results) => {
            next(results);
        }).catch((err) => {
            next(err);
        });
    });

    app.get(apiRoutes.test2, (req, res, next) => {
        exampleModule.test2('my awesome test route 2').then((results) => {
            next(results);
        }).catch((err) => {
            next(err);
        });
    });

    app.get(apiRoutes.test3, (req, res, next) => {
        exampleModule2.test3('my awesome test route 3').then((results) => {
            next(results);
        }).catch((err) => {
            next(err);
        });
    });

    app.get(apiRoutes.error, (req, res, next) => {
        const error = new errors.BadRequestResponse(500, 'This threw an error.');
        next(error);
    });

    /**
     * Example of doing route versioning
     */
    const version1 = (req, res, next) => {
        exampleModule2.test4('my awesome test route 4').then((results) => {
            next(results);
        }).catch((err) => {
            next(err);
        });
    };

    const version2 = (req, res, next) => {
        exampleModule2.test4('version 2 of this route').then((results) => {
            next(results);
        }).catch((err) => {
            next(err);
        });
    };

    const version3 = (req, res, next) => {
        exampleModule2.test4('version 3 of this route').then((results) => {
            next(results);
        }).catch((err) => {
            next(err);
        });
    };

    const NoMatchFound = (req, res) => {
        res.status(404).send('version not found');
    };

    app.get(apiRoutes.test4, routesVersioning({
        '^1.0.0': version1, // will accept 1.0.0 - 1.9.9
        '~2.0.0': version2, // will accept 2.0.0 - 2.0.9
        '3.0.0': version3, // will accept 3.0.0 only
    }, NoMatchFound)); // returns not found if accept-version doesn't match version accepted
};
