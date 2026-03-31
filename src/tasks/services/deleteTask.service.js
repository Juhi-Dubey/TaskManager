const { deleteTaskProvider } = require("../providers/deleteTask.provider");

async function deleteTaskService(taskId, userId) {
    const deletedTask = await deleteTaskProvider(taskId, userId);

    if (!deletedTask) {
        throw { status: 404, message: "Task not found" };
    }

    return deletedTask;
}

module.exports = { deleteTaskService };