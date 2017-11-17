
global.Promise = require('bluebird');

const winston = require('winston');
const express = require('express');

const bodyParser = require('body-parser');
const helmet = require('helmet');

const config = require('./server/config/config');
const middleware = require('./server/middleware');
const validator = require('express-validator');

global.logger = winston;
const logger = global.logger;
const app = express();

app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(validator());
app.use(middleware.accessControl);

// routes
require('./server/routes/index')(app);

// init
require('./server/init/initialize');

app.use(middleware.response);

app.listen(config.app.port, (err) => {
    if (err) {
        return logger.info(`error - ${err}`);
    }
    return logger.info(`server running on port: ${config.app.port}`);
});
