const {Task} = require('../task.schema.js');


async function getTasksProvider({ userId, limit, page, order }) {
    const skip = (page - 1) * limit;

    const tasks = await Task.find({ user: userId })
        .sort({ createdAt: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(limit);

    return tasks;
}

module.exports = { getTasksProvider };