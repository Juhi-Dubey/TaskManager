const {Task} = require('../task.schema.js');


async function getTasksProvider({ userId, limit, page, order }) {
    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([

        Task.find({ user: userId })
            .sort({ createdAt: order === "asc" ? 1 : -1 })
            .skip(skip)
            .limit(limit),
        Task.countDocuments({user: userId})
    ]); 
    return {tasks, total};
}

module.exports = { getTasksProvider };