const express = require('express');
const cors = require('cors');
const todoRoute = require('./routes/todoRoute'); 

const app = express();

app.use(express.json());
app.use(cors()); 
// Register the route with the base API path
app.use('/api/todos', todoRoute);

module.exports = app;
