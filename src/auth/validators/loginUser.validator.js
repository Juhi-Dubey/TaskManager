
const { body } = require("express-validator");

const loginUserValidator = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),

    body("password")
        .notEmpty().withMessage("Password is required")
];

module.exports = loginUserValidator;