const { body } = require("express-validator");

const createTaskValidator = [
  body("title")
    .notEmpty().withMessage("Title is required")
    .isString().withMessage("Title must be a string")
    .isLength({ max: 100 }).withMessage("Title cannot exceed 100 characters")
    .trim(),

  body("description")
    .notEmpty().withMessage("Description is required")
    .isString().withMessage("Description must be a string")
    .isLength({ max: 500 }).withMessage("Description cannot exceed 500 characters")
    .trim(),

  body("dueDate")
    .notEmpty().withMessage("Due date is required")
    .isISO8601().withMessage("Due date must be a valid ISO8601 date"),

  body("priority")
    .optional()
    .isIn(["low", "normal", "high"])
    .withMessage("Priority must be low, normal, or high"),

  body("status")
    .optional()
    .isIn(["todo", "inProgress", "completed"])
    .withMessage("Status must be todo, inProgress, or completed"),
];

module.exports = { createTaskValidator };