const User = require("../user.schema.js");
const { matchedData } = require('express-validator');
const {StatusCodes} = require('http-status-codes');
const errorLogger = require('../../helpers/errorLogger.helper.js');
const bcrypt = require('bcrypt');

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
        errorLogger(`Error creating a user: ${error.message}`, req, error);    

        return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
            reason: "Unable to process your request at the moment, please try later"
        }); 
    }
}

module.exports = createUserProvider;