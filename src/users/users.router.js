const express = require("express");
const { createUserController, getProfileController, updateUserController, deleteUserController, updatePasswordController } = require("./users.controller");

const { createUserValidator } = require("./validators/createUser.validator");
const { updatePasswordValidator } = require("./validators/updatePassword.validator");
const { validationResult } = require("express-validator");
const { authMiddleware } = require("../middleware/auth.middleware");

const usersRouter = express.Router();


function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    next();
}

usersRouter.post("/create", createUserValidator, validate, createUserController);
usersRouter.get("/profile", authMiddleware, getProfileController);
usersRouter.put("/update", authMiddleware, updateUserController);
usersRouter.delete("/delete", authMiddleware, deleteUserController);
usersRouter.put("/update-password", authMiddleware, updatePasswordValidator, validate, updatePasswordController);

module.exports = { usersRouter };






// const express = require('express');
// const {createUser, getProfile, deleteUser} = require('./users.controller.js');
// const {createUserValidator} = require('./validators/createUser.validator.js')
// const {StatusCodes} = require("http-status-codes");
// const { validationResult} = require('express-validator');
// const {authMiddleware} = require('../middleware/auth.middleware.js');
// const { getUserProvider} = require('./providers/getUserProvider.js');
// const {updateUserProvider} = require('./providers/updateUserProvider.js');
// const { deleteUserProvider } = require('./providers/deleteUserProvider.js');
// const { updatePasswordValidator } = require("./validators/updatePassword.validator");
// const { updatePasswordProvider } = require("./providers/updatePassword.provider");
// const usersRouter = express.Router();


// usersRouter.post('/create', createUserValidator, (req, res)=>{
//     const result = validationResult(req);

//     if(result.isEmpty()){
//         return createUser(req, res);
//     }
//     else{
//         return res.status(StatusCodes.BAD_REQUEST).json(result.array());
//     }
// });

// usersRouter.get("/profile", authMiddleware, getUserProvider);

// usersRouter.put("/update", authMiddleware, updateUserProvider);

// usersRouter.delete("/delete", authMiddleware, deleteUserProvider);

// usersRouter.put("/update-password", authMiddleware, updatePasswordValidator, (req, res) => {
//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             return res.status(StatusCodes.BAD_REQUEST).json(errors.array());
//         }

//         return updatePasswordProvider(req, res);
//     }
// );

// module.exports = {usersRouter};