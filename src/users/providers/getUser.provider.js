const { User } = require("../user.schema");

async function getUserProvider(userId) {
    return await User.findById(userId).select("-password");
}

module.exports = { getUserProvider };




// const {User} = require("../user.schema");
// const { StatusCodes } = require("http-status-codes");

// async function getUserProvider(req, res) {
//     try {
//         const user = await User.findById(req.user.id).select("-password");

//         if (!user) {
//             return res.status(StatusCodes.NOT_FOUND).json({
//                 message: "User not found"
//             });
//         }

//         return res.status(StatusCodes.OK).json(user);
//     } catch (error) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             message: "Something went wrong"
//         });
//     }
// }

// module.exports = {getUserProvider};