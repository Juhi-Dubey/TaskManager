const bcrypt = require("bcryptjs");
const { createUserProvider } = require("../providers/createUser.provider");

async function createUserService(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await createUserProvider({
        ...data,
        password: hashedPassword
    });
}

module.exports = { createUserService };