const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../../users/user.schema");
const jwtProvider = require("../providers/jwt.provider");

async function refreshTokenService(token) {
    if (!token) {
        throw { status: 401, message: "Refresh token required" };
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || !user.refreshToken) {
        throw { status: 401, message: "Invalid or expired refresh token" };
    }

    const isValid = await bcrypt.compare(token, user.refreshToken);

    if (!isValid) {
        throw { status: 401, message: "Invalid or expired refresh token" };
    }

    const newAccessToken = jwtProvider.generateAccessToken(user._id);
    const newRefreshToken = jwtProvider.generateRefreshToken(user._id);

    const hashedToken = await bcrypt.hash(newRefreshToken, 10);
    user.refreshToken = hashedToken;
    await user.save();

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };
}

module.exports = { refreshTokenService };