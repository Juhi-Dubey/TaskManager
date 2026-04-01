const { deleteUserProvider } = require("../providers/deleteUser.provider");

async function deleteUserService(userId) {
    const user = await deleteUserProvider(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return true;
}

module.exports = { deleteUserService };