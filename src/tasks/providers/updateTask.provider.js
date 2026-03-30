const Task = require("../task.schema.js");
const { matchedData } = require('express-validator');
const {StatusCodes} = require('http-status-codes');
const errorLogger = require('../../helpers/errorLogger.helper.js');


async function updateTaskProvider(req, res){
    const validatedData = matchedData(req);

    try{
        // fetch id
        const task = await Task.findById(validatedData._id);

        // update the task
        task.title = validatedData.title || task.title;
        task.description = validatedData.description || task.description;
        task.status = validatedData.status || task.status;
        task.priority = validatedData.priority || task.priority;
        task.dueDate = validatedData.dueDate || task.dueDate;

        // save'
        await task.save();
        return res.status(StatusCodes.OK).json(task);
    }

    catch(error){
        errorLogger("Error while updating tasks", req, error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            reason: "Unable to process your request at the moment, please try later."
        });
    }
         
}

module.exports = updateTaskProvider;