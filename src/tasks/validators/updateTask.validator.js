
const {body} = require("express-validator");

const updateTaskValidator = [
    body("_id", "Valid document id is required").notEmpty().isMongoId(),
    body("title", "Title must be a string").optional().isString().trim(),
    body("title", "The length cannot be more than 100 chars").isLength({max: 100}),

    body("dueDate", "due date must be a valid ISO8601 string").optional().isISO8601(),
    body("description", "The description cannot be empty and needs to be a string").optional().isString().trim(),
    body("description", "The description cannot be more than 500 characters").isLength({max: 500}),

    body("priority").isIn(['low', 'normal', 'high']).optional(),
    body("status").isIn(['todo', 'inProgress', 'completed']).optional(),
]   

module.exports = updateTaskValidator;