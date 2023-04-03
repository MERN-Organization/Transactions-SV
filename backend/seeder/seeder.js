const connectDB = require('../config/db');
connectDB();

// Models
const User = require('../models/UserModel');

// Seeder Data
const UsersSeederData = require('./users');

const importData = async () => {
    try {
        await User.collection.dropIndexes();
        await User.collection.deleteMany({});
        await User.insertMany(UsersSeederData);

        console.log('Seeder data proceeded successfully');

        process.exit();
    } catch (error) {
        console.error('Error while proccessing seeder data', error);
        process.exit(1);
    }
};
importData();
