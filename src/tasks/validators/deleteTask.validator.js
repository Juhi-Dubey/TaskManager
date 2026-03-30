const {param} = require('express-validator');


const deleteTaskValidator = [

    param("id", "Valid document id is required").notEmpty().isMongoId(),

];

module.exports = {deleteTaskValidator};