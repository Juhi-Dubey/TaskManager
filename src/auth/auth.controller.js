
const {loginUserProvider} = require("./providers/loginUser.provider");
const jwt = require('jsonwebtoken');
const {StatusCodes} = require("http-status-codes");


async function loginUser(req, res) {
    return await loginUserProvider(req, res);
}


async function refreshToken(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Refresh token required"
        });
    }

    try {
        // verify refresh token
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        // find user
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Invalid refresh token"
            });
        }

        // 🔥 generate NEW access token
        const newAccessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        // 🔥 generate NEW refresh token (THIS WAS MISSING)
        const newRefreshToken = jwt.sign(
            { id: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        // 🔥 replace old refresh token in DB
        user.refreshToken = newRefreshToken;
        await user.save();

        // 🔥 return BOTH tokens
        return res.status(StatusCodes.OK).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });

    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Invalid or expired refresh token"
        });
    }
}


async function logout(req, res) {
    const user = await User.findById(req.user.id);

    if (user) {
        user.refreshToken = null;
        await user.save();
    }

    return res.status(200).json({
        message: "Logged out successfully"
    });
}


module.exports = {loginUser, refreshToken, logout};




// const User = require("../users/user.schema.js");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { StatusCodes } = require("http-status-codes");

// async function handleLogin(req, res) {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(StatusCodes.UNAUTHORIZED).json({
//                 message: "Invalid email or password",
//             });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         console.log("Password match:", isMatch);
//         if (!isMatch) {
//             return res.status(StatusCodes.UNAUTHORIZED).json({
//                 message: "Invalid email or password",
//             });
//         }

//         const token = jwt.sign(
//             { id: user._id, email: user.email },
//             "your_secret_key",
//             { expiresIn: "1d" }
//         );

//         return res.status(StatusCodes.OK).json({ token });

//     } catch (error) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             message: "Something went wrong",
//         });
//     }
// }

// module.exports = { handleLogin };


