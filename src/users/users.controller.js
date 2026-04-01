// const { StatusCodes} = require("http-status-codes");
// const {createUserProvider} = require("./providers/createUserProvider");
// const {getUserProvider} = require("./providers/getUserProvider");
// const { deleteUserProvider} = require("./providers/deleteUserProvider");

// async function createUser(req, res) {
//     return await createUserProvider(req, res);
// };


// async function getProfile(req, res) {
//     return await getUserProvider(req, res);
// }

// async function deleteUser(req, res) {
//     return await deleteUserProvider(req, res);
// }

// module.exports = {
//     createUser, getProfile, deleteUser
// }


const { createUserService } = require("./services/createUser.service");
const { getUserService } = require("./services/getUser.service");
const { updateUserService } = require("./services/updateUser.service");
const { deleteUserService } = require("./services/deleteUser.service");
const { updatePasswordService } = require("./services/updatePassword.service");


async function createUserController(req, res) {
    const user = await createUserService(req.body);
    return res.status(201).json(user);
}

async function getProfileController(req, res) {
    const user = await getUserService(req.user.id);
    return res.status(200).json(user);
}

async function updateUserController(req, res) {
    const user = await updateUserService(req.user.id, req.body);
    return res.status(200).json(user);
}

async function deleteUserController(req, res) {
    await deleteUserService(req.user.id);
    return res.status(200).json({ message: "User deleted successfully" });
}

async function updatePasswordController(req, res) {
    const { oldPassword, newPassword } = req.body;

    await updatePasswordService(req.user.id, oldPassword, newPassword);

    return res.status(200).json({
        message: "Password updated successfully"
    });
}

module.exports = { createUserController, getProfileController, updateUserController, deleteUserController, updatePasswordController };