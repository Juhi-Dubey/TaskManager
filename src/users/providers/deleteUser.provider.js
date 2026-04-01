const { User } = require("../user.schema");

async function deleteUserProvider(userId) {
    return await User.findByIdAndDelete(userId);
}

module.exports = { deleteUserProvider };






// const {User} = require("../user.schema");
// const { StatusCodes } = require("http-status-codes");

// async function deleteUserProvider(req, res) {
//     try {
//         const userId = req.user.id;

//         const user = await User.findByIdAndDelete(userId);

//         if (!user) {
//             return res.status(StatusCodes.NOT_FOUND).json({
//                 message: "User not found"
//             });
//         }

//         return res.status(StatusCodes.OK).json({
//             message: "User deleted successfully"
//         });

//     } catch (error) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             message: "Something went wrong"
//         });
//     }
// }

// module.exports = {deleteUserProvider};