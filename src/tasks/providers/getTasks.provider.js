const Task = require('../task.schema.js');
const { matchedData } = require('express-validator');
const {StatusCodes} = require('http-status-codes');
const errorLogger = require('../../helpers/errorLogger.helper.js');


async function getTasksProvider(req, res){
    const query = matchedData(req);
    console.log(query);

    try{
        const { limit = 10, page = 1, order = "asc" } = query;

        const tasks = await Task.find()
            .sort({ createdAt: order === "asc" ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return res.status(StatusCodes.OK).json(tasks);
    }
    catch(error)
    {
        errorLogger("Error while fetching tasks", req, error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            reason: "Unable to process your request at the moment, please try later."
        });
    }
    
}


module.exports = getTasksProvider;