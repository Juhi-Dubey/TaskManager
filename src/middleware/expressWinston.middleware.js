
const expressWinston = require('express-winston');
const logger = require('../helpers/winston.helper.js');

const expressWinstonLogger = expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}} responded with {{res.statusCode}} in {{res.responseTime}}ms",
    expressFormat: true,
    colorize: true,

});

module.exports = expressWinstonLogger;