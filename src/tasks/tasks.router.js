const express = require('express');
const { validationResult} = require('express-validator');
const tasksController = require('./tasks.controller.js');
const {StatusCodes} = require("http-status-codes");
const createTaskValidator = require('./validators/createTask.validator.js');
const getTasksValidator = require('./validators/getTasks.validator.js');
const updateTaskValidator = require('./validators/updateTask.validator.js');
const deleteTaskValidator = require('./validators/deleteTask.validator.js');
const authMiddleware = require('../middleware/auth.middleware.js');

const tasksRouter = express.Router();

tasksRouter.get('/tasks', authMiddleware, getTasksValidator, (req, res) =>{
    const result = validationResult(req);

    if(result.isEmpty()){
        return tasksController.handleGetTasks(req, res);
    }
    else{
        res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

tasksRouter.post('/tasks', authMiddleware, createTaskValidator, (req, res)=>{
    const result = validationResult(req);

    if(result.isEmpty()){
        return tasksController.handlePostTasks(req, res);
    }
    else{
        res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});


tasksRouter.patch('/tasks/:id', authMiddleware, updateTaskValidator, (req, res) =>{
    const result = validationResult(req);

    if(result.isEmpty()){
        return tasksController.handlePatchTasks(req, res);
    }
    else{
        res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});


tasksRouter.delete('/tasks/:id', authMiddleware, deleteTaskValidator, (req, res) =>{
    const result = validationResult(req);

    if(result.isEmpty()){
        return tasksController.handleDeleteTasks(req, res);
    }
    else{
        res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});


module.exports = tasksRouter;