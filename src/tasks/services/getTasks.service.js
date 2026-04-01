const { getTasksProvider } = require("../providers/getTasks.provider");

async function getTasksService(query, userId) {
    let { limit = 10, page = 1, order = "desc" } = query;

    limit = parseInt(limit);
    page = parseInt(page);

    if (limit <= 0 || page <= 0) {
        throw { status: 400, message: "Invalid pagination values" };
    }

    if(limit > 20){
        limit = 20
    }

    const {tasks, total} = await getTasksProvider({
        userId,
        limit,
        page,
        order
    });

    const totalPages = Math.ceil(total/ limit);

    return{
        tasks, 
        pagination: {
            total, 
            totalPages,
            currentPage: page,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        }
    }

}

module.exports = { getTasksService };