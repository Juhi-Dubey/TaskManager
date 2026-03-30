const express = require('express');
const authController = require('./auth.controller.js');
const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const loginUserValidator = require("./validators/loginUser.validator");
const router = express.Router();

router.post("/login", loginUserValidator, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json(errors.array());
    }

    return authController.loginUser(req, res);
});

module.exports = router;
