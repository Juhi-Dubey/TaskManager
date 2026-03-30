const {Schema, model} = require('mongoose');


const userSchema = new Schema({
    firstName: {
        type: String,
        required: [ true, "First name is required"],
        trim: true,
        maxLength: [100, "First name cannot exceed 100 characters"],
    },

    lastName: {
        type: String,
        required: false,
        trim: true,
        maxLength: [100, "Last name cannot exceed 100 characters"], 
    },

    email:{
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(email){
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
            },
            message: () => `Please enter a valid email address`,
        },
    },


    password:{
        type: String,
        required: [true, "Password is required"],
        minLength: [8, 'Password must be atleast 8 characters long'],
        // validate: {
        //     validator: function(password){
        //         return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
        //     },
        //     message: () => `Password must include at least one digit, one uppercase character, one lowercase character, and one special character`,
        // },
    },

},{
    timestamps: true,
    versionKey: false,
});


const User = model("User", userSchema);

module.exports = User;