const { getTasksProvider } = require("../providers/getTasks.provider");

async function getTasksService(query, userId) {
    let { limit = 10, page = 1, order = "desc" } = query;

    limit = parseInt(limit);
    page = parseInt(page);

    if (limit <= 0 || page <= 0) {
        throw { status: 400, message: "Invalid pagination values" };
    }

    const tasks = await getTasksProvider({
        userId,
        limit,
        page,
        order
    });

    return tasks;
}

module.exports = { getTasksService };