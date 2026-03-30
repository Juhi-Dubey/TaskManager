const { body } = require("express-validator");

const updatePasswordValidator = [
    body("oldPassword")
        .notEmpty().withMessage("Old password is required"),

    body("newPassword")
        .notEmpty().withMessage("New password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
];

module.exports = { updatePasswordValidator };