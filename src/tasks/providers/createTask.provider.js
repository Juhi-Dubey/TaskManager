const {matchedData} = require('express-validator');
const Task = require("../task.schema.js");
const {StatusCodes} = require("http-status-codes");
const errorLogger = require('../../helpers/errorLogger.helper.js');


async function createTasksProvider(req, res){

    const validatedResult = matchedData(req);
    
    const task = new Task(validatedResult);

    try{
        await task.save();
        return res.status(StatusCodes.CREATED).json(task);
    }
    catch(error){
        errorLogger(`Error creating a new task: ${error.message}`, req, error);    

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            reason: "Unable to process you request at the moment, please try later"
        });
    }
    
}


module.exports = createTasksProvider;