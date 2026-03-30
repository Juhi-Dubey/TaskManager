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


tasksRouter.get('/tasks', authMiddleware, getTasksValidator, (req, res) =>{
    const result = validationResult(req);

    if(result.isEmpty()){
        return handleGetTasks(req, res);
    }
    else{
        res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

tasksRouter.post('/tasks', authMiddleware, createTaskValidator, (req, res)=>{
    const result = validationResult(req);

    if(result.isEmpty()){
        return handlePostTasks(req, res);
    }
    else{
        res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});


tasksRouter.patch('/tasks/:id', authMiddleware, updateTaskValidator, (req, res) =>{
    const result = validationResult(req);

    if(result.isEmpty()){
        return handlePatchTasks(req, res);
    }
    else{
        res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});


tasksRouter.delete('/tasks/:id', authMiddleware, deleteTaskValidator, (req, res) =>{
    const result = validationResult(req);

    if(result.isEmpty()){
        return handleDeleteTasks(req, res);
    }
    else{
        res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});


module.exports = {tasksRouter};