const { Task } = require("../task.schema");

async function updateTaskProvider(taskId, userId, updateData) {
    const task = await Task.findOneAndUpdate(
        { _id: taskId, user: userId }, // 🔐 ownership check
        updateData,
        { new: true, runValidators: true }
    );

    return task;
}

module.exports = { updateTaskProvider };
