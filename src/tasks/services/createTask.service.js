const { createTaskProvider } = require("../providers/createTask.provider");

async function createTaskService(data, userId) {
    const task = await createTaskProvider({
        ...data,
        user: userId
    });

    return task;
}

module.exports = { createTaskService };