
const {Task} = require("../task.schema.js");


async function deleteTaskProvider(taskId, userId) {
    const task = await Task.findOneAndDelete({
        _id: taskId,
        user: userId
    });

    return task;
}

module.exports = { deleteTaskProvider };