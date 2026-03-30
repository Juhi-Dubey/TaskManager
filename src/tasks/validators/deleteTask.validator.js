const {body} = require('express-validator');


const deleteTaskValidator = [

    body("_id", "Valid document id is required").notEmpty().isMongoId(),

];

module.exports = deleteTaskValidator;