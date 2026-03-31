const {StatusCodes, ReasonPhrases} = require("http-status-codes");
const { createTaskService } = require("./services/createTask.service");
const { getTasksService } = require("./services/getTasks.service");
const { updateTaskService } = require("./services/updateTask.service");
const { deleteTaskService } = require("./services/deleteTask.service");


async function handleGetTasks(req, res){
    try {
        const tasks = await getTasksService(req.query, req.user.id);

        return res.status(StatusCodes.OK).json({
            message: "Tasks fetched successfully",
            data: tasks
        });

    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Something went wrong"
        });
    }
}


async function handlePostTasks(req, res){
    try {
        const task = await createTaskService(req.body, req.user.id);

        return res.status(StatusCodes.CREATED).json({
            message: "Task created successfully",
            data: task
        });

    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Something went wrong"
        });
    } 
}


async function handlePatchTasks(req, res) {
    
    try {
        console.log("ID:", req.params.id);
        console.log("User:", req.user.id);
        console.log("Body:", req.body);
        
        const updatedTask = await updateTaskService(
            req.params.id,
            req.body,
            req.user.id
        );

        return res.status(StatusCodes.OK).json({
            message: "Task updated successfully",
            data: updatedTask
        });

    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Something went wrong"
        });
    }
}



async function handleDeleteTasks(req, res) {
    try {
        await deleteTaskService(req.params.id, req.user.id);

        return res.status(StatusCodes.OK).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Something went wrong"
        });
    }
}


module.exports = {
    handleGetTasks,
    handlePostTasks,
    handlePatchTasks,
    handleDeleteTasks
};