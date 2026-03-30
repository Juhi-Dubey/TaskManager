const {User} = require("../user.schema");
const { StatusCodes } = require("http-status-codes");

async function updateUserProvider(req, res) {
    try {
        const allowedUpdates = ["firstName", "lastName", "email"];
        const updates = {};

        Object.keys(req.body).forEach((key) => {
            if (allowedUpdates.includes(key)) {
                updates[key] = req.body[key];
            }
        });

        const user = await User.findByIdAndUpdate(
            req.user.id,
            updates,
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found"
            });
        }

        return res.status(StatusCodes.OK).json(user);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });
    }
}

module.exports = {updateUserProvider};