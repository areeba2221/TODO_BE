// require('dotenv').config();
// const mongoose = require('mongoose');


// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log('MongoDB Connected...');
//   } catch (err) {
//     console.dir(err)
//     console.error('Connection Error:', err.message);
//     process.exit(1); // Stop the app if connection fails
//   }
// };

// module.exports = connectDB;





require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URI);

        console.log('MongoDB Connected');

    } catch (err) {

        console.error('Database Connection Failed');
        console.error(err.message);

        process.exit(1);
    }
};

module.exports = connectDB;