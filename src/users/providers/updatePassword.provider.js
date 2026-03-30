const { User } = require("../user.schema.js");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");

async function updatePasswordProvider(req, res) {
    try {
        const { oldPassword, newPassword } = req.body;

        if (oldPassword === newPassword) {
            return res.status(400).json({
                message: "New password must be different"
            });
        }
        
        // 1. Get user with password
        const user = await User.findById(req.user.id).select("+password");

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found"
            });
        }

        // 2. Compare old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Old password is incorrect"
            });
        }

        // 3. Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 4. Update password
        user.password = hashedPassword;
        await user.save();

        return res.status(StatusCodes.OK).json({
            message: "Password updated successfully"
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });
    }
}

module.exports = { updatePasswordProvider };