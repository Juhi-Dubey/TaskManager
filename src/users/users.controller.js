const { StatusCodes} = require("http-status-codes");
const createUserProvider = require("./providers/createUserProvider");


async function createUser(req, res) {
    return await createUserProvider(req, res);
};


module.exports = {
    createUser,
}