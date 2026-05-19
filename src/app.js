const express = require('express');
const cors = require('cors');
const todoRoute = require('./routes/todoRoute'); 
const authRoute = require('./routes/authRoute');
const cookieParser = require('cookie-parser');



const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
})); 
app.use(cookieParser());
// Register the route with the base API path
app.use('/api/todos', todoRoute);
app.use('/api/auth', authRoute);

module.exports = app;
