const express = require('express');
const { validationResult} = require('express-validator');
const {handleGetTasks, handlePostTasks, handlePatchTasks, handleDeleteTasks} = require('./tasks.controller.js');
const {StatusCodes} = require("http-status-codes");
const {createTaskValidator} = require('./validators/createTask.validator.js');
const {getTasksValidator} = require('./validators/getTasks.validator.js');
const {updateTaskValidator} = require('./validators/updateTask.validator.js');
const {deleteTaskValidator} = require('./validators/deleteTask.validator.js');
const {authMiddleware} = require('../middleware/auth.middleware.js');

const tasksRouter = express.Router();


// 🧪 reusable validator handler (so you stop repeating yourself)
function validate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({
        errors: errors.array()
    });
  }

  next();
}


tasksRouter.get("/", authMiddleware, getTasksValidator, validate, handleGetTasks);


tasksRouter.post("/", authMiddleware, createTaskValidator, validate, handlePostTasks);


tasksRouter.patch("/:id", authMiddleware, updateTaskValidator, validate, handlePatchTasks);


tasksRouter.delete("/:id", authMiddleware, deleteTaskValidator, validate, handleDeleteTasks);


module.exports = { tasksRouter };