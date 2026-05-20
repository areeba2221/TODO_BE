const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');

const todoRoute = require('./routes/todoRoute'); 
const authRoute = require('./routes/authRoute');


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
})); 

// Register the route with the base API path
app.use('/api/todos', todoRoute);
app.use('/api/auth', authRoute);

module.exports = app;
