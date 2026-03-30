const express = require('express');
const usersController = require('./users.controller.js');
const createUserValidator = require('./validators/createUser.validator.js')
const {StatusCodes} = require("http-status-codes");
const { validationResult} = require('express-validator');

const usersRouter = express.Router();

usersRouter.post('/create', createUserValidator, (req, res)=>{
    const result = validationResult(req);

    if(result.isEmpty()){
        return usersController.createUser(req, res);
    }
    else{
        return res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

module.exports = usersRouter;