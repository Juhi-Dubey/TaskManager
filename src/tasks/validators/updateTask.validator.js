const { param, body } = require("express-validator");

const updateTaskValidator = [
  param("id")
    .notEmpty().withMessage("Task ID is required")
    .isMongoId().withMessage("Invalid task ID"),

  body("title")
    .optional()
    .isString().withMessage("Title must be a string")
    .isLength({ max: 100 }).withMessage("Title cannot exceed 100 characters")
    .trim(),

  body("description")
    .optional()
    .isString().withMessage("Description must be a string")
    .isLength({ max: 500 }).withMessage("Description cannot exceed 500 characters")
    .trim(),

  body("dueDate")
    .optional()
    .isISO8601().withMessage("Due date must be valid"),

  body("priority")
    .optional()
    .isIn(["low", "normal", "high"])
    .withMessage("Invalid priority"),

  body("status")
    .optional()
    .isIn(["todo", "inProgress", "completed"])
    .withMessage("Invalid status"),
];

module.exports = { updateTaskValidator };