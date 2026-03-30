
const loginUserProvider = require("./providers/loginUser.provider");

async function loginUser(req, res) {
    return await loginUserProvider(req, res);
}

module.exports = {
    loginUser
};


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


