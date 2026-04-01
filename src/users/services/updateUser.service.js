const { updateUserProvider } = require("../providers/updateUser.provider");

async function updateUserService(userId, data) {
    const allowedFields = ["firstName", "lastName", "email"];
    const updates = {};

    Object.keys(data).forEach((key) => {
        if (allowedFields.includes(key)) {
            updates[key] = data[key];
        }
    });

    const user = await updateUserProvider(userId, updates);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

module.exports = { updateUserService };