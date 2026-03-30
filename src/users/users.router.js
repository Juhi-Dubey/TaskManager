const express = require('express');
const {createUser, getProfile, deleteUser} = require('./users.controller.js');
const {createUserValidator} = require('./validators/createUser.validator.js')
const {StatusCodes} = require("http-status-codes");
const { validationResult} = require('express-validator');
const {authMiddleware} = require('../middleware/auth.middleware.js');
const { getUserProvider} = require('./providers/getUserProvider.js');
const {updateUserProvider} = require('./providers/updateUserProvider.js');
const { deleteUserProvider } = require('./providers/deleteUserProvider.js');
const { updatePasswordValidator } = require("./validators/updatePassword.validator");
const { updatePasswordProvider } = require("./providers/updatePassword.provider");
const usersRouter = express.Router();


usersRouter.post('/create', createUserValidator, (req, res)=>{
    const result = validationResult(req);

    if(result.isEmpty()){
        return createUser(req, res);
    }
    else{
        return res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

usersRouter.get("/profile", authMiddleware, getUserProvider);

usersRouter.put("/profile", authMiddleware, updateUserProvider);

usersRouter.delete("/delete", authMiddleware, deleteUserProvider);

usersRouter.put("/update-password", authMiddleware, updatePasswordValidator, (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json(errors.array());
        }

        return updatePasswordProvider(req, res);
    }
);

module.exports = {usersRouter};