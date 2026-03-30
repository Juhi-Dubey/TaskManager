const {Schema, model} = require('mongoose');

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, "Task title is required"],
        trim: true,
        maxLength: [100, "Task title cannot exceed 100 characters"],
    },
    description: {
        type: String,
        required: [true, "Task description is required"],
        trim: true,
        maxLength: [500, "Task description cannot exceed 500 characters"],
    },
    status: {
        type: String,
        required: [true, "Task status is required"],
        enum: ["todo", "inProgress", "completed"],
        default: "todo",
    },
    priority: {
        type: String, 
        required: [true, "Task priority is required"],
        enum: ['low', 'normal', 'high'],
        default: 'normal',
    }, 
    dueDate: {
        type: Date,
        required: [true, "Task due date is required"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Task must be associated with a user"],
    }

}, { timestamps: true, versionKey: false } );

const Task = model('Task', taskSchema);;

module.exports = {Task};