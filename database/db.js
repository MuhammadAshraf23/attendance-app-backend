const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dataBaseUrl = process.env.DATABASE_URL;

mongoose.connect(dataBaseUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = mongoose;
