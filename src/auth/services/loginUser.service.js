const { User } = require("../../users/user.schema");
const bcrypt = require("bcryptjs");
const jwtProvider = require("../providers/jwt.provider");

async function loginUserService(data) {
    const { email, password } = data;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw { status: 401, message: "Invalid credentials" };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw { status: 401, message: "Invalid credentials" };
    }

    const accessToken = jwtProvider.generateAccessToken(user._id);
    const refreshToken = jwtProvider.generateRefreshToken(user._id);

    const hashedToken = await bcrypt.hash(refreshToken, 10);
    user.refreshToken = hashedToken;
    await user.save();


    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return {
        user: userObj,
        accessToken,
        refreshToken
    };
}




module.exports = { loginUserService };