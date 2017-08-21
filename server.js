
global.Promise = require('bluebird');

const winston = require('winston');
const express = require('express');

const bodyParser = require('body-parser');
const helmet = require('helmet');

const config = require('./server/config/config');
const middleware = require('./server/middleware');

global.logger = winston;
const logger = global.logger;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(middleware.accessControl);

// routes
require('./server/routes/index')(app);

// init
require('./server/init/initialize');

app.use(middleware.response);

app.listen(config.app.port, (err) => {
    if (err) {
        return logger.error(`error - ${err}`);
    }

    return logger.info(`server running on port: ${config.app.port}`);
});
