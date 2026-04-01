

const { loginUserService } = require("./services/loginUser.service");
const { StatusCodes } = require("http-status-codes");
const { refreshTokenService } = require("./services/refreshToken.service.js");
const {logoutUserService} = require("./services/logoutUser.service.js")


async function loginUserController(req, res) {
    try {
        const result = await loginUserService(req.body);

        return res.status(StatusCodes.OK).json(result);

    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Something went wrong"
        });
    }
}

async function refreshTokenController(req, res) {
    try {
        const { refreshToken } = req.body;

        const result = await refreshTokenService(refreshToken);

        return res.status(StatusCodes.OK).json(result);

    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message
        });
    }
}


async function handleLogoutController(req, res) {
    console.log(req.user);

    try {
        const userId = req.user.id;

        if (!userId) {
            throw { status: 400, message: "User not found in request" };
        }

        await logoutUserService(userId);

        return res.status(200).json({
            message: "Logged out successfully",
            success: true
        });
    } 
    catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Something went wrong"
        });
    }
}


module.exports = { loginUserController, refreshTokenController, handleLogoutController };








0


// const {loginUserProvider} = require("./providers/loginUser.provider");
// const jwt = require('jsonwebtoken');
// const {StatusCodes} = require("http-status-codes");


// async function loginUser(req, res) {
//     return await loginUserProvider(req, res);
// }


// async function refreshToken(req, res) {
//     const { refreshToken } = req.body;

//     if (!refreshToken) {
//         return res.status(StatusCodes.UNAUTHORIZED).json({
//             message: "Refresh token required"
//         });
//     }

//     try {
//         // verify refresh token
//         const decoded = jwt.verify(
//             refreshToken,
//             process.env.JWT_REFRESH_SECRET
//         );

//         // find user
//         const user = await User.findById(decoded.id);

//         if (!user || user.refreshToken !== refreshToken) {
//             return res.status(StatusCodes.UNAUTHORIZED).json({
//                 message: "Invalid refresh token"
//             });
//         }

//         // 🔥 generate NEW access token
//         const newAccessToken = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "15m" }
//         );

//         // 🔥 generate NEW refresh token (THIS WAS MISSING)
//         const newRefreshToken = jwt.sign(
//             { id: user._id },
//             process.env.JWT_REFRESH_SECRET,
//             { expiresIn: "7d" }
//         );

//         // 🔥 replace old refresh token in DB
//         user.refreshToken = newRefreshToken;
//         await user.save();

//         // 🔥 return BOTH tokens
//         return res.status(StatusCodes.OK).json({
//             accessToken: newAccessToken,
//             refreshToken: newRefreshToken
//         });

//     } catch (error) {
//         return res.status(StatusCodes.UNAUTHORIZED).json({
//             message: "Invalid or expired refresh token"
//         });
//     }
// }


// async function logout(req, res) {
//     const user = await User.findById(req.user.id);

//     if (user) {
//         user.refreshToken = null;
//         await user.save();
//     }

//     return res.status(200).json({
//         message: "Logged out successfully"
//     });
// }


// module.exports = {loginUser, refreshToken, logout};



