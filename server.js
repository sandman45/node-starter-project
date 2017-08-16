
global.Promise = require('bluebird');
const logger = require('');
const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');

const config = require(`../server/config/config`);
const middleware = require(`../server/middleware`);
const appDir = path.dirname(require.main.filename);

const options = {
    name: 'boiler-plate',
    folderPath: appDir,
};

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(middleware.requestModification.requestId);
app.use(helmet());
app.use(middleware.accessControl);

// routes
require('./server/routes/index')(app);

// init
logger.initializeLogger(options);

require('./server/init/initialize');

app.use(middleware.response);


app.listen(config.app.port, (err) => {
    if (err) {
        return logger.error(null, `error - ${err}`);
    }

    return logger.info(null, `server running on port: ${config.app.port}`);
});
