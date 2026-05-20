require('dotenv').config();

const app = require('./app');
const Todo = require('./models/Todo');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

app.listen(PORT, () => {
    console.log(`Server connected`);
});