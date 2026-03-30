const {User} = require("../../users/user.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

async function loginUserProvider(req, res) {
    try {
        const { email, password } = req.body;

        // 1. Check user exists
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Invalid credentials"
            });
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Invalid credentials"
            });
        }

        // 3. Generate token
        const accessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        user.refreshToken = refreshToken;
        await user.save();

        // 4. Remove password
        const userObj = user.toObject();
        delete userObj.password;

        return res.status(StatusCodes.OK).json({
            user: userObj,
            accessToken,
            refreshToken
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });
    }
}

module.exports = {loginUserProvider};