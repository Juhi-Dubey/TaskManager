const { User } = require("../../users/user.schema.js");

async function removeRefreshToken(userId) {
    await User.findByIdAndUpdate(userId, {
        $unset: { refreshToken: ""}
    });

    // await User.findByIdAndUpdate(userId, {
    //     $pull: {refreshToken: token}
    // })
}


module.exports = { removeRefreshToken};