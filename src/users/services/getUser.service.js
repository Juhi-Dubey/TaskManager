const { getUserProvider } = require("../providers/getUser.provider");

async function getUserService(userId) {
    const user = await getUserProvider(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

module.exports = { getUserService };