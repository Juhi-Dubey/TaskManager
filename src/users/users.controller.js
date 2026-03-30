const { StatusCodes} = require("http-status-codes");
const {createUserProvider} = require("./providers/createUserProvider");
const {getUserProvider} = require("./providers/getUserProvider");


async function createUser(req, res) {
    return await createUserProvider(req, res);
};


async function getProfile(req, res) {
    return await getUserProvider(req, res);
}

module.exports = {
    createUser, getProfile,
}