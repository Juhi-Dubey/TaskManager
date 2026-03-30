const User = require("../user.schema.js");
const { matchedData } = require('express-validator');
const {StatusCodes} = require('http-status-codes');
const errorLogger = require('../../helpers/errorLogger.helper.js');
const bcrypt = require('bcryptjs');

async function createUserProvider(req, res){
    const validatedData = matchedData(req);

    try{        

        const hashedPassword = await bcrypt.hash(validatedData.password, 10);
        const user = new User({
            firstName: validatedData.firstName,
            lastName: validatedData.lastName, 
            email: validatedData.email,
            password: hashedPassword,
        });

        await user.save();

        const userObj = user.toObject();
        delete userObj.password;
        return res.status(StatusCodes.CREATED).json(userObj);
    }

    catch(error){
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already exists",
            });
        }

        errorLogger(`Error creating a user: ${error.message}`, req, error);    

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            reason: "Unable to process your request at the moment, please try later"
        }); 
    }
}

module.exports = createUserProvider;