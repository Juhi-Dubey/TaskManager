
const {body} = require("express-validator");


const createUserValidator = [
    body("firstName", "The firstName is required and must be a string").notEmpty().isString().isLength({max: 100}).trim(),
    body("lastName", "The lastName is a string").optional().isString().isLength({max: 100}).trim(),
    body("email", "The email is required and must be a valid email").notEmpty().isEmail().isLength({max: 200}).trim(),
    body("password", "Password must include at least one digit, one uppercase character, one lowercase character, and one special character")
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
        .notEmpty().isStrongPassword().isLength({min: 8}),

];

module.exports = {createUserValidator};