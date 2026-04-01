const { removeRefreshToken } = require("../providers/logoutUser.provider");


async function logoutUserService(userId){
    await removeRefreshToken(userId);
}


module.exports = {logoutUserService};