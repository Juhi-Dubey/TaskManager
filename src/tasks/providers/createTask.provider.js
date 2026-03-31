const { Task } = require("../task.schema");

async function createTaskProvider(data) {
    const task = await Task.create(data);
    return task;
}

module.exports = { createTaskProvider };