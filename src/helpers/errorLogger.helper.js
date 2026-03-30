const logger = require('./winston.helper.js');


function errorLogger(message, req, error){
    logger.error(`Error creating a new task: ${error.message}`,{
        metaData: {
            errorCode: error.code,
            errorName: error.name,
            method: req.method,
            url: req.originalUrl,
            query: req.query,
            params: req.params,
            error: error,
        },
    });
}


module.exports = errorLogger;