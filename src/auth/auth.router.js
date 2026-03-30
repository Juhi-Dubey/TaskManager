const express = require('express');
const {loginUser} = require('./auth.controller.js');
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const {loginUserValidator} = require("./validators/loginUser.validator");
const { refreshToken } = require("./auth.controller.js");
const authRouter = express.Router();


authRouter.post("/login", loginUserValidator, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json(errors.array());
    }

    return loginUser(req, res);
});

authRouter.post("/refresh-token", refreshToken);

module.exports = {authRouter};
