require('dotenv').config();

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
}

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
}


const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const { StatusCodes } = require('http-status-codes');
const {responseFormatter} = require('./middleware/responseFormatter.js');
const {tasksRouter} = require('./tasks/tasks.router.js');
const {authRouter} = require('./auth/auth.router.js');
const {usersRouter} = require('./users/users.router.js')
const mongoose = require('mongoose');
const {expressWinstonLogger} = require('./middleware/expressWinston.middleware.js');

const app = express();
const port = process.env.PORT || 3001;


app.use(express.json());


const corsOptions ={
    origin: [ "http://localhost:3001", "http://localhost:3000" ],    
}

app.use(cors(corsOptions));


let accessLogStream = fs.createWriteStream(
    path.join(__dirname, '..', 'access.log'), 
    {
        flags: 'a',
    }
);
  
// morgan logging middleware
app.use(morgan("combined", { stream: accessLogStream }));
app.use(responseFormatter);
app.use(expressWinstonLogger);

app.use('/tasks', tasksRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);



app.use((req, res)=>{
    res.status(StatusCodes.NOT_FOUND).json({message: "Not Found"});
});

async function bootstrap(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        // await mongoose.connect('mongodb://localhost:27017/', 
        //     {dbName: 'fullstackTasks'}
        // );
        console.log("Connected to MongoDB");
    
        app.listen(port, () => {
            console.log(`App listening on port no : ${port}`);
        });
    }

    catch(error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

bootstrap();

