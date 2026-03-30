const { StatusCodes} = require("http-status-codes");
const {createUserProvider} = require("./providers/createUserProvider");
const {getUserProvider} = require("./providers/getUserProvider");
const { deleteUserProvider} = require("./providers/deleteUserProvider");

async function createUser(req, res) {
    return await createUserProvider(req, res);
};


async function getProfile(req, res) {
    return await getUserProvider(req, res);
}

async function deleteUser(req, res) {
    return await deleteUserProvider(req, res);
}

module.exports = {
    createUser, getProfile, deleteUser
}