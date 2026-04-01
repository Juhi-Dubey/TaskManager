const bcrypt = require("bcryptjs");
const { getUserWithPasswordProvider, saveUserProvider } = require("../providers/updatePassword.provider");

async function updatePasswordService(userId, oldPassword, newPassword) {
    if (oldPassword === newPassword) {
        throw new Error("New password must be different");
    }

    const user = await getUserWithPasswordProvider(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
        throw new Error("Old password is incorrect");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await saveUserProvider(user);

    return true;
}

module.exports = { updatePasswordService };