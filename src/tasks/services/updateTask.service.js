const { updateTaskProvider } = require("../providers/updateTask.provider");

async function updateTaskService(taskId, data, userId) {
    if (!taskId) {
        throw { status: 400, message: "Task ID is required" };
    }

    if (!data || Object.keys(data).length === 0) {
        throw { status: 400, message: "No data provided for update" };
    }

    const updatedTask = await updateTaskProvider(taskId, userId, data);

    if (!updatedTask) {
        throw { status: 404, message: "Task not found or unauthorized" };
    }

    return updatedTask;
}

module.exports = { updateTaskService };