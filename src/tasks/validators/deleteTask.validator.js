const { param } = require("express-validator");

const deleteTaskValidator = [
  param("id")
    .notEmpty().withMessage("Task ID is required")
    .isMongoId().withMessage("Invalid task ID"),
];

module.exports = { deleteTaskValidator };