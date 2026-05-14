const app = require('./src/app');

const Todo = require('./src/models/Todo');
const connectDB = require('./src/config/db');


const PORT = process.env.PORT;


connectDB();
app.listen(PORT, () => {
    console.log('Server connected');
});